import {
  convertStringRmToCents,
  isDate, isDescription, isFullDate, isInOutBalance,
} from './helpers';

describe('inOutBalance', () => {
  test('should return true for .00', () => {
    expect(isInOutBalance('.00')).toBe(true);
  });

  test('should true for 466.50', () => {
    expect(isInOutBalance('466.50')).toBe(true);
  });

  test('should true for 1,078,466.53', () => {
    expect(isInOutBalance('1,078,466.53')).toBe(true);
  });

  test('should true for 330.00+ 4,071.00', () => {
    expect(isInOutBalance('330.00+ 4,071.00')).toBe(true);
  });
  test('should true for outgoing 3,000.00- 2,335.50', () => {
    expect(isInOutBalance('3,000.00- 2,335.50')).toBe(true);
  });

  test('should false if date 21/09', () => {
    expect(isInOutBalance('21/09')).toBe(false);
  });

  test('should false if contain string "15th Floor, Tower A, Dataran Maybank,', () => {
    expect(isInOutBalance('15th Floor, Tower A, Dataran Maybank,')).toBe(false);
  });
});

describe('isDate line', () => {
  test('should true for 01/09', () => {
    expect(isDate('01/09')).toBe(true);
  });

  test('should true for 23/10', () => {
    expect(isDate('23/10')).toBe(true);
  });

  test('should return false string length more than 5', () => {
    expect(isDate('23/233')).toBe(false);
  });

  test('should return false string length more than 5', () => {
    expect(isDate('23nov')).toBe(false);
  });

  test('should return false when date is more than 31', () => {
    expect(isDate('32/08')).toBe(false);
  });

  test('should return false is month is more than 12', () => {
    expect(isDate('14/13')).toBe(false);
  });

  test('should return false for money "6,796.00"', () => {
    expect(isDate('6,796.00')).toBe(false);
  });

  test('should return false if contain string "MUKA/"', () => {
    expect(isDate('muka/')).toBe(false);
  });
});

describe('isDescription', () => {
  test('should return true for string contain "to a/c"', () => {
    expect(isDescription('TRANSFER TO A/C')).toBe(true);
  });

  test('should return true for string contain all caps', () => {
    expect(isDescription('TRANSFER TO A/C')).toBe(true);
  });

  test('should return true for string contain "fr a/c', () => {
    expect(isDescription('TRANSFER FR A/C')).toBe(true);
  });

  test('should return true for "ACTIVATE ACCOUNT"', () => {
    expect(isDescription('ACTIVATE ACCOUNT')).toBe(true);
  });

  test('should return true for "BEGINNING BALANCE"', () => {
    expect(isDescription('BEGINNING BALANCE')).toBe(true);
  });
});

describe('isFullDate', () => {
  test('should return true for "20/11/20"', () => {
    expect(isFullDate('20/11/20')).toBe(true);
  });

  test('should return true for ": 31/01/21"', () => {
    expect(isFullDate(': 31/01/21')).toBe(true);
  });

  test('should false when contain long text "01/10/20, ALL REFERENCES TO"', () => {
    expect(isFullDate('01/10/20, ALL REFERENCES TO')).toBe(false);
  });
});

describe('convertStringRmToCents', () => {
  test('should return 1234560 for 12,345.60', () => {
    expect(convertStringRmToCents('12,345.60')).toEqual(1234560);
  });

  test('should return 34200 for 342.00', () => {
    expect(convertStringRmToCents('342.00')).toEqual(34200);
  });

  test('should return 0 for .00', () => {
    expect(convertStringRmToCents('.00')).toEqual(0);
  });
});
