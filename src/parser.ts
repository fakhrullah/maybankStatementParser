/* eslint-disable import/prefer-default-export */
import { fixDescriptions, fixMoreDetails, fixTransactions } from './fixer';
import getAccountDetail from './getAccountDetail';
import {
  convertStringRmToCents, isPerfectAlign, parseLine,
  splitInOutBalance, stringToDate,
} from './helpers';
import logger from './logger';
import {
  AccountModel, TransactionDescription, TransactionModel, TransactionValueModel,
} from './models';

type UsableLines = {
  dates: string[]
  year: string
  descriptions: TransactionDescription[]
  transactionsValue: TransactionValueModel[]
  moreDetails: string[][]
};
/**
 * First line parser to get related lines
 */
const initialParser = (lines: string[]): UsableLines => {
  const datesStr: string[] = [];
  let currLineIndex = 0;
  let month: string = '';
  let year: string = '';
  const descriptions: TransactionDescription[] = [];
  const transactions: TransactionValueModel[] = [];

  while (currLineIndex < lines.length - 1) {
    const data = parseLine(lines[currLineIndex]);

    if (data.lineState === 'date') {
      datesStr.push(data.data);
      const getMonth = data.data.split('/')[1];
      if (getMonth !== month) month = getMonth;
    }

    if (data.lineState === 'full_date') {
      const splittedDate: string[] = data.data.split('/');
      const YY = splittedDate[splittedDate.length - 1];
      // console.log(YY);
      // 1957 Malaya (Malaysia) independence day
      if (parseInt(YY, 10) < 57) {
        year = `20${YY}`;
      } else {
        year = `19${YY}`;
      }
    }

    if (data.lineState === 'money') {
      const { inOut, balance } = splitInOutBalance(data.data);
      const removedPlusMinusEndSymbol = inOut.slice(0, inOut.length - 1);
      const getEndSymbol = inOut.slice(inOut.length - 1);
      const value = convertStringRmToCents(removedPlusMinusEndSymbol);
      const type = getEndSymbol === '+' ? 'income' : 'outgoing';
      const formatBalance = convertStringRmToCents(balance);

      transactions.push({
        value,
        type,
        balance: formatBalance,
      });
    }

    if (data.lineState === 'desc') {
      descriptions.push({
        text: data.data,
        index: currLineIndex,
      });
    }

    currLineIndex += 1;
  }

  const moreDetails: string[][] = descriptions.map((desc, idx) => {
    const startIdx = desc.index + 1;
    let endIdx;
    if (idx === descriptions.length - 1) {
      endIdx = startIdx + 5;
    } else {
      endIdx = descriptions[idx + 1].index;
    }

    return lines.slice(startIdx, endIdx);
  });

  return {
    dates: [`01/${month}`, ...datesStr],
    year,
    descriptions,
    transactionsValue: transactions,
    moreDetails,
  };
};

export const parseContent = (str: string): TransactionModel[] => {
  const fixedTransactions: TransactionModel[] = [];
  let fixedDescriptions: string[] = [];

  // console.log(str);
  // convert content to array
  const fileContentLineByLine: string[] = str.split(/\r?\n/);

  // loop & process array index by index
  const {
    dates, year, descriptions, transactionsValue, moreDetails,
  } = initialParser(fileContentLineByLine);

  logger.debug(dates);
  logger.debug(year);
  logger.debug(descriptions);
  logger.debug(transactionsValue);

  // Validate data
  const validateDataSync = isPerfectAlign(dates, descriptions, transactionsValue);

  // Fixing data based on length - dates, descriptions &
  if (!validateDataSync.isAlign) {
    validateDataSync.errors?.forEach((errorText) => logger.error(errorText));

    fixedDescriptions = fixDescriptions(descriptions.map((desc) => desc.text), dates);
    // fixedDescriptions.push();
    //
  }

  // Fix transactions
  const fixedTransactionsValue = fixTransactions(transactionsValue);

  // Fix transactions detail
  const fixedMoreDetails = fixMoreDetails(moreDetails);

  const account: AccountModel = getAccountDetail(fileContentLineByLine);

  // Build transaction models
  dates.forEach((date, idx) => {
    fixedTransactions.push({
      account,
      date: stringToDate(`${dates[idx]}/${year}`),
      // type: transactionsValue[idx].type,
      type: fixedTransactionsValue[idx].type,
      // balance: transactionsValue[idx].balance,
      // balance: fixedTransactionsValue[idx].balance,
      balance: fixedTransactionsValue[idx].balance || 0,
      // value: transactionsValue[idx].value,
      value: fixedTransactionsValue[idx].value,
      description: fixedDescriptions[idx],
      // moreDetail: moreDetails[idx],
      moreDetail: fixedMoreDetails[idx],
    });
  });

  return fixedTransactions;
};

export const parser = parseContent;
