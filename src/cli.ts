import logger from './logger';
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
    logger.debug('END');
    const transactions: TransactionModel[] = parseContent(data);
    const output: string = formatOutput(transactions, 'csv');
    logger.debug(output);
  });

  stdin.on('error', (error) => {
    logger.error(error);
  });
};

if (stdin.isTTY) {
  logger.error('Set the `--file` argument');
} else {
  processPipedData();
}
