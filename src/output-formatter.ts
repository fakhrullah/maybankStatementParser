import { format as dateFormat } from 'date-fns';
import { TransactionModel } from './models';

/* eslint-disable import/prefer-default-export */
const convertToJSON = (
  input: TransactionModel[],
):string => JSON.stringify({ data: input }, null, 4);

const convertToCSV = (transactions: TransactionModel[]):string => {
  const output: string[] = [];
  const headerLine = 'Date,Income,Outgoing,Balance,Description,More Details';
  output.push(headerLine);

  transactions.forEach(({
    date, type, value, balance, description, moreDetail,
  }) => {
    const currencyFormat = new Intl.NumberFormat('ms-MY', {
      minimumFractionDigits: 2,
    });
    const formattedDate: string = dateFormat(date, 'MM/dd/yyyy');
    const income: number = type === 'income' ? value / 100 : 0;
    const outgoing: number = type === 'outgoing' ? value / 100 : 0;

    // const formattedBalance = numFormat.format(balance / 100);
    const formattedBalance: number = balance / 100;

    const line = `${formattedDate},"${currencyFormat.format(income)}","${currencyFormat.format(outgoing)}","${currencyFormat.format(formattedBalance)}",${description},${moreDetail.join(', ')}`;
    output.push(line);
  });

  return output.join('\n');
};

export const formatOutput = (transactions: TransactionModel[], format: 'csv' | 'json'):string => {
  if (format === 'csv') {
    return convertToCSV(transactions);
  }
  return convertToJSON(transactions);
};
