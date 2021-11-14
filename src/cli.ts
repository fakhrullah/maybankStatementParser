import { program } from 'commander';
import { readFileSync, existsSync, writeFileSync } from 'fs';
import logger from './logger';
import { TransactionModel } from './models';
import { formatOutput } from './output-formatter';
import { parser } from './parser';

const { stdin } = process;

program
  .version('1.0.0')
  .option('--input <filepath>', 'File input. Required if not piping data')
  .option('--output <filepath>', 'File to output. Without output, output will be print in console')
  .option('--format <format>', 'Output format. csv or json. [csv]');

const programRun = (data?: string) => {
  const options = program.opts();
  let transactions: TransactionModel[];

  const { output, input, format } = options;

  // Get transactions
  if (data) {
    transactions = parser(data);
  } else {
    // input required
    if (!input) {
      const errorMsg = '--input flag is required when not piping data';
      const errorInputFileIsRequired = new Error(errorMsg);
      logger.error(errorMsg);
      throw errorInputFileIsRequired;
    }
    const dataFromFile = readFileSync(input, { encoding: 'utf-8' }).toString();
    transactions = parser(dataFromFile);
  }

  // Format transactions
  // validate format
  let outputFormat: 'csv' | 'json' = format.toLowerCase();
  if (outputFormat !== 'json') outputFormat = 'csv';
  const processedData = formatOutput(transactions, outputFormat);

  // Get output type
  // Then print output of the processed data
  if (!output) {
    // eslint-disable-next-line no-console
    console.log(`\n\n${processedData}\n`);
  } else {
    const outputFileExist = existsSync(output);
    if (outputFileExist) {
      const errorMsg = `${output} file already exist. Cannot overwrite the file.`;
      logger.error(errorMsg);
      throw new Error(errorMsg);
    }

    const outputFilepath = output;
    writeFileSync(outputFilepath, processedData);
  }
};

const processPipedData = () => {
  let data: string = '';
  stdin.setEncoding('utf-8');
  stdin.on('data', (chunk) => {
    data += chunk;
  });

  stdin.on('end', () => {
    logger.debug('END');
    // Parse command line options
    program.parse(process.argv);
    programRun(data);
  });

  stdin.on('error', (error) => {
    logger.error(error);
  });
};

if (stdin.isTTY) {
  logger.error('Set the `--input` argument');
  program.parse(process.argv);
  programRun();
} else {
  processPipedData();
}
