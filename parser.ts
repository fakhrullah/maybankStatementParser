import { readFileSync } from 'fs';

// Copy the whole content of maybank statement
// Paste inside a file (example filename: `sept_2020`)

const transactions: TranscationModel[] = [];

// Read the file contents
const fileContent: string = readFileSync('./2020_10.txt').toString();
const fileContentLineByLine: string[] = fileContent.split(/\r?\n/);

// Parse the content

// Get the dates
// Convert to date format with year
// Find the keyword 'baki legar'
const bakiLegarIndex: number = fileContentLineByLine.findIndex((str) => str.match(/baki legar/i));
// console.log(fileContentLineByLine[bakiLegarIndex]);
// Move up step by step until not date format (DD/MM) anymore
const isDateFormatString = (str: string): boolean => RegExp(/[0-9][0-9]\/[0-9][0-9]/).test(str);
const endDateString = fileContentLineByLine[bakiLegarIndex - 1];
let startDateString = endDateString;
let startDateIndex = bakiLegarIndex - 1;
while (isDateFormatString(startDateString)) {
  startDateIndex -= 1;
  startDateString = fileContentLineByLine[startDateIndex];
  // console.log(startDateString);
}
const dates = fileContentLineByLine.slice(startDateIndex + 1, bakiLegarIndex);
// console.log(dates);

// Get the in/out money
const inOutNBalanceMoney: string[] = fileContentLineByLine
  // must start with dot or number & next chars must be number, dot, comma, plus sign, minus sign
  .filter((str) => /^[0-9.][0-9.,+\- ]*$/.test(str))
  // after dot must have 2 chars (cents)
  .filter((str) => /.*\.[0-9]{2}.*$/.test(str))
  // must be length more than 2
  .filter((str) => str.length > 2);

// console.log(inOutNBalanceMoney);
// Separate income/outcome & balance using split(space)
const splitted: {inOut: string, balance:string}[] = inOutNBalanceMoney.map((str) => {
  const [inOut, balance] = str.split(' ');

  // inOut Money must have sign + or -
  if (inOut.includes('+') || inOut.includes('-')) {
    return {
      inOut,
      balance,
    };
  }

  return {
    inOut: '',
    balance: inOut,
  };
});
// console.log(splitted);

// Convert money income/outcome to their type &
// Convert the money into floating format (remove comma)
const inOutNBalanceWFormat: TranscationValueModel[] = splitted.map((data) => {
  const value = data.inOut.slice(0, data.inOut.length - 1).replace(',', '').replace('.', '');
  const formattedValue = parseInt(value, 10);
  const type = data.inOut.slice(data.inOut.length - 1) === '+' ? 'income' : 'outgoing';
  const { balance = '' } = data;
  const formattedBalance = parseInt(balance.replace(',', '').replace('.', ''), 10);

  return {
    value: formattedValue,
    type,
    balance: formattedBalance,
  };
});
// console.log(inOutNBalanceWFormat);

// Get description
const descIndexes: number[] = fileContentLineByLine.map((str, index) => {
  if (str.toLowerCase().includes('a/c')) { return index; }
  return 0;
});
// descIndexes
//   .filter((item) => item !== 0)
//   .forEach((num) => {
//     console.log(fileContentLineByLine[num]);
//   });
// Get more details
const startIdx: number[] = descIndexes
  .filter((item) => item !== 0)
  .map((num) => num + 1);

const endIdxs: number[] = startIdx.map((num) => num - 2);
const endIdxModified = endIdxs.slice(1);
endIdxModified.push(startIdx[startIdx.length - 1] + 2);

const moreDetails: {startIdx: number, endIdx: number}[] = startIdx.map((sIdx, index) => ({
  startIdx: sIdx,
  endIdx: endIdxModified[index],
}));
// console.log(moreDetails);

// moreDetails.forEach((dt) => {
//   let curr = dt.startIdx;
//   while (curr !== dt.endIdx) {
//     console.log(fileContentLineByLine[curr]);
//     curr += 1;
//   }
//   console.log('');
// });

// Create CSV file output

interface TranscationModel {
  account: {
    name: string
    isBank: boolean
    bank?: {
      name: string
      number: string
    }
  }
  date: Date,
  value: number, // integer & cents
  type: 'income' | 'outgoing',
  description: string
  moreDetail: string
}

interface TranscationValueModel {
  value: number,
  type: 'income' | 'outgoing',
  balance: number
}
