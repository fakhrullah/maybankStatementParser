/* eslint-disable import/prefer-default-export */

import { LineState } from './models';

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

export const isDescription = (str: string) => {
  const lowerCaseStr = str.toLowerCase();
  // if (
  //   !lowerCaseStr.includes('to a/c')
  //   || !lowerCaseStr.includes('fr a/c')
  // ) return false;

  if (!lowerCaseStr.includes('a/c')) {
    return false;
  }

  // if (/.*[a-z].*/.test(str)) { return false; }

  if (str !== str.toUpperCase()) { return false; }

  return true;
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
