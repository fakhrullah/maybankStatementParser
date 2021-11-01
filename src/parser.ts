/* eslint-disable import/prefer-default-export */
import { fixDescriptions, fixTransactions } from './fixer';
import {
  convertStringRmToCents, isPerfectAlign, parseLine,
  splitInOutBalance, stringToDate,
} from './helpers';
import { TransactionDescription, TransactionModel, TransactionValueModel } from './models';

type UsableLines = {
  dates: string[]
  year: string
  descriptions: TransactionDescription[]
  transactionsValue: TransactionValueModel[]
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

  return {
    dates: [`01/${month}`, ...datesStr],
    year,
    descriptions,
    transactionsValue: transactions,
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
    dates, year, descriptions, transactionsValue,
  } = initialParser(fileContentLineByLine);

  console.log(dates);
  console.log(year);
  console.log(descriptions);
  console.log(transactionsValue);

  // Validate data
  const validateDataSync = isPerfectAlign(dates, descriptions, transactionsValue);

  // Fixing data based on length - dates, descriptions &
  if (!validateDataSync.isAlign) {
    validateDataSync.errors?.forEach((errorText) => console.log(errorText));

    fixedDescriptions = fixDescriptions(descriptions.map((desc) => desc.text), dates);
    // fixedDescriptions.push();
    //
  }

  // Fix transactions
  const fixedTransactionsValue = fixTransactions(transactionsValue);

  // Build transaction models
  dates.forEach((date, idx) => {
    fixedTransactions.push({
      account: {
        isBank: true,
        bank: { name: 'Maybank', number: '324325324' },
        name: 'maybank-fajarhac-technology',
      },
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
      moreDetail: 'moreDetails[idx]',
    });
  });

  return fixedTransactions;
};
