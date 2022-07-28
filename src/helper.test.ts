import { isInOutBalance } from './helpers';

test('should return true as inOutBalance type of line', () => {
  expect(isInOutBalance('3,790.00+ 4,834.50')).toEqual(true);
  expect(isInOutBalance('144.00+ 6,058.50')).toEqual(true);
  expect(isInOutBalance('544.50')).toEqual(true);
  expect(isInOutBalance('1,500.00-2,044.50')).toEqual(true);
});
