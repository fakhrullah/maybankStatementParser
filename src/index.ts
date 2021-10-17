import { readFileSync } from 'fs';
import { parse as dateParse, format as dateFormat } from 'date-fns';
import path from 'path';
import {
  parseLine, splitInOutBalance,
} from './helpers';
import {
  AccountModel, TransactionValueModel, TransactionModel,
} from './models';

// Copy the whole content of maybank statement
// Paste inside a file (example filename: `sept_2020`)

const transactions: TransactionModel[] = [];

// Read the file contents
const fileContent: string = readFileSync(path.join(__dirname, '../pdfToText/2021_09.txt')).toString();
const fileContentLineByLine: string[] = fileContent.split(/\r?\n/);

// let lineState:LineState;
let currLineIndex = 0;
const datesStr: string[] = [];
let year: string = '';
let month: string = '';
const transactionValues: TransactionValueModel[] = [];
const descriptions: string[] = [];
const descriptionIndexes: number[] = [];
// const descriptionCounter: number = 0;
while (currLineIndex < fileContentLineByLine.length - 1) {
  const data = parseLine(fileContentLineByLine[currLineIndex]);

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
    const value = parseInt(inOut.slice(0, inOut.length - 1).replace(',', '').replace('.', ''), 10);
    const type = inOut.slice(inOut.length - 1) === '+' ? 'income' : 'outgoing';
    const formatBalance = parseInt(balance.replace(',', '').replace('.', ''), 10);

    transactionValues.push({
      value,
      type,
      balance: formatBalance,
    });
  }

  if (data.lineState === 'desc') {
    descriptions.push(data.data);
    descriptionIndexes.push(currLineIndex);
  }

  currLineIndex += 1;
}

const fixedDates = [`01/${month}/${year}`, ...datesStr.map((dt) => `${dt}/${year}`)];

const fixedBalance: number[] = [];
const fixedInOut: TransactionValueModel[] = [{ value: 0, type: 'income' }];

transactionValues.forEach((data) => {
  fixedBalance.push(data.balance || 0);
  if (!Number.isNaN(data.value) || data.value === 0) {
    fixedInOut.push({
      value: data.value,
      type: data.type,
    });
  }
});

const fixedDescription = ['Beginning balance', ...descriptions];

const moreDetails: string[][] = descriptionIndexes.map((ds, idx) => {
  const startIndex = ds + 1;
  let endIndex;
  // last index
  if (idx === descriptionIndexes.length - 1) {
    endIndex = startIndex + 4;
  } else {
    endIndex = descriptionIndexes[idx + 1];
  }

  // when moreDetail more than 4 lines
  if (endIndex - startIndex > 4) {
    endIndex = startIndex + 4;
  }

  return fileContentLineByLine.slice(startIndex, endIndex);
});

const fixedMoreDetails = [[''], ...moreDetails];

fixedDates.forEach((data, idx) => {
  // console.log(fixedDates[idx]);
  const account: AccountModel = {
    name: 'Maybank Fajarhac Technology',
    isBank: true,
    bank: {
      name: 'Maybank',
      number: '80u08eju392',
    },
  };

  transactions.push({
    account,
    description: fixedDescription[idx],
    date: dateParse(fixedDates[idx], 'dd/MM/yyyy', new Date()),
    type: fixedInOut[idx].type,
    value: fixedInOut[idx].value,
    balance: fixedBalance[idx],
    moreDetail: fixedMoreDetails[idx]?.join(',') || '',
  });
});

// ---------- NEED to validate data
// Check dates length vs transactionValuess length vs description length
// All should be matches length  if not, need to fix

if (fixedDates.length < fixedDescription.length) {
  const lengthDiff = fixedDescription.length - fixedDates.length;
  for (let index = lengthDiff; index === 0; index -= 1) {
    fixedDates.push(`31/${month}/${year}`);
  }
}

if (fixedDates.length > fixedDescription.length) {
  const lengthDiff = fixedDates.length - fixedDescription.length;
  for (let index = lengthDiff; index === 0; index -= 1) {
    fixedDates.push(`31/${month}/${year}`);
  }
}
// --------------------- Write data in CSV format

console.log('Date,Income,Outgoing,Balance,Description,More Details');
transactions.forEach(({
  date, type, value, balance, description, moreDetail,
}) => {
  let formattedDate = date.toString();
  try {
    formattedDate = dateFormat(date, 'MM/dd/yyyy') ?? '';
  } catch (error) {
    // console.log(error);
  }
  const income = type === 'income' ? value / 100 : '0';
  const outgoing = type === 'outgoing' ? value / 100 : '0';

  // const numFormat = new Intl.NumberFormat('ms-MY', { style: 'currency', currency: 'MYR' });
  // const formattedBalance = numFormat.format(balance / 100);
  const formattedBalance = balance / 100;

  console.log(`${formattedDate},"${income}","${outgoing}","${formattedBalance}",${description},${moreDetail}`);
});
