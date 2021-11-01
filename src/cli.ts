import { TransactionModel } from './models';
import { formatOutput } from './output-formatter';
import { parseContent } from './parser';

const { stdin } = process;

const processPipedData = () => {
  let data: string = '';
  stdin.setEncoding('utf-8');
  stdin.on('data', (chunk) => {
    data += chunk;
  });

  stdin.on('end', () => {
    console.log('end');
    const transactions: TransactionModel[] = parseContent(data);
    const output: string = formatOutput(transactions, 'csv');
    console.log(output);
  });

  stdin.on('error', (error) => {
    console.log(error);
  });
};

if (stdin.isTTY) {
  console.log('Set the `--file` argument');
} else {
  processPipedData();
}

// output format CSV
// output format JSON

// output file
// output console.log

// console.log(output);
