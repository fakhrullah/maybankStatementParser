import { parse } from 'date-fns';
import _ from 'lodash';
import { ms } from 'date-fns/locale';
import logger from './logger';
import { AccountModel } from './models';

interface AccountDetailPerPage {
  slashPageLine?: { line: number, content: string }
  tarikhPenyataLine?: { line: number, content: string }
  pageNum?: number
  accountNumber?: string
  date?: Date
  accountName?: string
}

const getAccountDetail = (statementsFileContents: string[]): AccountModel => {
  const bankName: string = 'Maybank'; // Because this is maybank-statement-parser
  const isBank: boolean = true; // Because this is maybank-statement-parser

  // Account number located inside `頁 /PAGE` & `TARIKH PENYATA`
  // Usually one line before `TARIKH PENYATA`
  // & one line after date `dd/mm/yy`
  // with format all number
  let accountDetailPerPageIndex = 0;
  const accountDetailPerPage: AccountDetailPerPage[] = [];
  statementsFileContents.forEach((line, index) => {
    if (line.includes('/PAGE')) {
      // logger.debug(line);
      const accountDet = { slashPageLine: { line: index, content: line } };
      logger.debug(accountDet);
      accountDetailPerPage.push(accountDet);
    }
    if (line.includes('TARIKH PENYATA')) {
      // logger.debug(line);
      accountDetailPerPage[accountDetailPerPageIndex]
        .tarikhPenyataLine = { line: index, content: line };
      logger.debug(accountDetailPerPage[accountDetailPerPageIndex]);
      accountDetailPerPageIndex += 1;
    }
  });

  const completeAccountDetailPerPage: AccountDetailPerPage[] = accountDetailPerPage
    .map((account) => {
      const pageNum = parseInt(statementsFileContents[account.slashPageLine!.line + 1], 10);
      const accountNumber = statementsFileContents[account.tarikhPenyataLine!.line - 1];
      const dateStr = statementsFileContents[account.slashPageLine!.line + 2].split(' ')[1];
      const date = parse(dateStr, 'dd/MM/yy', new Date(), { locale: ms });
      const accountName = statementsFileContents[account.tarikhPenyataLine!.line + 2];

      const accountDetailComplete: AccountDetailPerPage = {
        ...account,
        pageNum,
        accountNumber,
        date,
        accountName,
      };

      return accountDetailComplete;
    });

  // Validation
  const validateAcc = completeAccountDetailPerPage
    .map((account) => ({ x: account.accountNumber, y: account.accountName }));
  validateAcc.forEach((acc, idx) => {
    if (!_.isEqual(validateAcc[0], acc)) {
      logger.warn(`Account ${idx} Error:\n${acc} is not equal to ${validateAcc[0]}`);
    }
  });

  const bankAccountNumber: string = completeAccountDetailPerPage[0].accountNumber!;
  const accountName: string = completeAccountDetailPerPage[0].accountName!;

  const account: AccountModel = {
    isBank,
    name: accountName,
    bank: {
      name: bankName,
      number: bankAccountNumber,
    },
  };
  return account;
};

export default getAccountDetail;
