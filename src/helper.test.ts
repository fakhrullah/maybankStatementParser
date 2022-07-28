import { isInOutBalance, splitInOutBalance } from './helpers';

test('should return true as inOutBalance type of line', () => {
  expect(isInOutBalance('3,790.00+ 4,834.50')).toEqual(true);
  expect(isInOutBalance('144.00+ 6,058.50')).toEqual(true);
  expect(isInOutBalance('544.50')).toEqual(true);
  expect(isInOutBalance('1,500.00-2,044.50')).toEqual(true);
});

describe('splitInOutBalance', () => {
  test('should return inOut & balance when string separate by space', () => {
    const hasSpaceInBetween = splitInOutBalance('3,790.00+ 4,834.50');
    expect(hasSpaceInBetween.inOut).toEqual('3,790.00+');
    expect(hasSpaceInBetween.balance).toEqual('4,834.50');
  });

  test('should return inOut only when string only one money value', () => {
    const hasSpaceInBetween = splitInOutBalance('544.50');
    expect(hasSpaceInBetween.inOut).toEqual('');
    expect(hasSpaceInBetween.balance).toEqual('544.50');
  });

  test('should return inOut & balance when string NOT separated by space', () => {
    const hasSpaceInBetween = splitInOutBalance('1,500.00-2,044.50');
    expect(hasSpaceInBetween.inOut).toEqual('1,500.00-');
    expect(hasSpaceInBetween.balance).toEqual('2,044.50');
  });
});
