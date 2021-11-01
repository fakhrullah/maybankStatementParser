/* eslint-disable import/prefer-default-export */

import { confirmedTransaction } from './helpers';
import { TransactionValueModel } from './models';

export const fixDescriptions = (descriptions: string[], dates: string[]): string[] => {
  const fixedDescriptions: string[] = [];

  const compareDatesLengthNDescriptionsLength:number = dates.length - descriptions.length;

  // DONOT fix descriptions when descritions is less than dates
  if (compareDatesLengthNDescriptionsLength <= 0) {
    return descriptions;
  }

  const descWithConfirmationStatus = descriptions.map((desc) => confirmedTransaction(desc));
  const confirmedDesc = descWithConfirmationStatus.filter((desc) => desc.isConfirmed);

  if (dates.length === confirmedDesc.length) {
    confirmedDesc.forEach((desc) => {
      fixedDescriptions.push(desc.data);
    });
    return fixedDescriptions;
  }

  return fixedDescriptions;
};

export const fixTransactions = (
  transactions: TransactionValueModel[],
): TransactionValueModel[] => {
  const fixedTransactions: TransactionValueModel[] = [];

  // fix the first - beginning balance
  fixedTransactions.push({
    type: 'brought-forward',
    value: 0,
    balance: transactions[0].balance || 0,
  });

  // Insert all income & outgoing without balance
  transactions
    .filter((trans) => !Number.isNaN(trans.value))
    .forEach((trans) => {
      const transaction = { type: trans.type, value: trans.value };
      fixedTransactions.push(transaction);
    });

  const balancesFromData: number[] = transactions
    .filter((trans) => trans.balance !== undefined)
    .filter((trans) => trans.balance !== 0)
    .map((trans) => trans.balance || 0);
  const uniqueBalancesFromData: number[] = Array.from(new Set(balancesFromData));
  console.log(uniqueBalancesFromData);

  const balancesFromCalculation: number[] = [];

  // eslint-disable-next-line consistent-return
  fixedTransactions.forEach((trans, idx) => {
    if (idx === 0) return balancesFromCalculation.push(fixedTransactions[idx].balance!);
    const prevBalance = balancesFromCalculation[idx - 1];
    if (trans.type === 'income') {
      balancesFromCalculation.push(
        prevBalance + fixedTransactions[idx].value,
      );
    }
    if (trans.type === 'outgoing') {
      balancesFromCalculation.push(
        prevBalance - fixedTransactions[idx].value,
      );
    }
  });
  console.log(balancesFromCalculation);

  // Validate fixedTransactions

  // Update fixedTransactions with balance
  // eslint-disable-next-line no-plusplus
  for (let index = 1; index < fixedTransactions.length; index++) {
    fixedTransactions[index].balance = balancesFromCalculation[index];
  }

  return fixedTransactions;
};
