/* eslint-disable import/prefer-default-export */

import { parse as parseDate } from 'date-fns';
import {
  LineState, TransactionDescription, TransactionValueModel,
} from './models';

export const isInOutBalance = (str: string) => {
  // must start with dot or number & next chars must be number, dot, comma, plus sign, minus sign
  if (!/^[0-9.][0-9.,+\- ]*$/.test(str)) {
    return false;
  }

  // after dot must have 2 chars (cents)
  if (!/.*\.[0-9]{2}.*$/.test(str)) {
    return false;
  }

  // must be length more than 2
  if (str.length <= 2) {
    return false;
  }

  return true;
};

export const isDate = (str: string) => {
  if (str.length !== 5) return false;
  if (!str.includes('/')) return false;

  const [date, month] = str.split('/');
  if (parseInt(month, 10) > 12) return false;
  if (parseInt(date, 10) > 31) return false;

  if (/[a-zA-Z]+/.test(str)) return false;

  return true;
};

export const confirmedTransaction = (str: string): { data: string, isConfirmed: boolean } => {
  const maybankTransactionDesc: string[] = [
    'TRANSFER TO A/C',
    'BEGINNING BALANCE',
    'ACTIVATE ACCOUNT',
    'TRANSFER FR A/C',
    'INTER-BANK PAYMENT INTO A/C',
  ];

  const confirmedDesc: boolean = maybankTransactionDesc.reduce<boolean>((acc, curr) => {
    if (acc) return true;
    if (str.toLowerCase().includes(curr.toLowerCase())) return true;
    return false;
  }, false);

  if (confirmedDesc) {
    return {
      data: str,
      isConfirmed: true,
    };
  }

  return {
    data: str,
    isConfirmed: false,
  };
};

export const isDescription = (str: string) => {
  const lowerCaseStr = str.toLowerCase();

  if (str !== str.toUpperCase()) { return false; }

  // List Maybank transaction description
  const maybankTransactionDesc: string[] = [
    'TRANSFER TO A/C',
    'BEGINNING BALANCE',
    'ACTIVATE ACCOUNT',
    'TRANSFER FR A/C',
    'IBG PAYMENT INTO A/C',
  ];

  const confirmedDesc: boolean = maybankTransactionDesc.reduce<boolean>((acc, curr) => {
    if (acc) return true;
    if (lowerCaseStr.includes(curr.toLowerCase())) return true;
    return false;
  }, false);

  if (confirmedDesc) return true;

  if (lowerCaseStr.includes('fr a/c')) return true;
  if (lowerCaseStr.includes('to a/c')) return true;

  return false;
};

export const isFullDate = (str: string) => {
  if (!/[0-9]{2}\/[0-9]{2}\/[0-9]{2}/.test(str)) {
    return false;
  }

  // cannot contain string
  if (/[a-zA-Z]/.test(str)) {
    return false;
  }

  return true;
};

export const splitInOutBalance = (str: string): { inOut: string, balance:string } => {
  const [inOut, balance = ''] = str.split(' ');

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
};

export const parseLine = (str: string): { lineState: LineState, data: any } => {
  if (isInOutBalance(str)) {
    // console.log(str);
    return {
      lineState: 'money',
      data: str,
    };
  }

  if (isDate(str)) {
    // console.log(str);
    return {
      lineState: 'date',
      data: str,
    };
  }

  if (isDescription(str)) {
    // console.log(str);
    return {
      lineState: 'desc',
      data: str,
    };
  }

  if (isFullDate(str)) {
    // console.log(str);
    return {
      lineState: 'full_date',
      data: str,
    };
  }

  return {
    lineState: undefined,
    data: str,
  };
};

export const convertStringRmToCents = (stringRM: string): number => parseInt(stringRM.replace(',', '').replace('.', ''), 10);

export const isPerfectAlign = (
  dates: string[],
  descriptions: TransactionDescription[],
  transactionsValues: TransactionValueModel[],
):{ isAlign: boolean, errors?: string[] } => {
  const errors: string[] = [];
  // console.log(dates);
  // console.log(descriptions);
  // console.log(transactionsValues);

  if (dates.length !== descriptions.length) {
    const comparisonText = dates.length > descriptions.length ? 'more than' : 'less than';
    errors.push(`Dates length is ${comparisonText} descriptions length`);
  }

  if (descriptions.length !== transactionsValues.length) {
    const comparisonText = descriptions.length > transactionsValues.length ? 'more than' : 'less than';
    errors.push(`Descriptions length is ${comparisonText} transactionsValues`);
  }

  if (dates.length !== transactionsValues.length) {
    const comparisonText = dates.length > transactionsValues.length ? 'more than' : 'less than';
    errors.push(`Dates length is ${comparisonText} transactionValues`);
  }

  if (errors.length > 0) {
    return { isAlign: false, errors };
  }

  return { isAlign: true };
};

export const stringToDate = (
  dateStr: string,
): Date => parseDate(dateStr, 'dd/MM/yyyy', new Date());
