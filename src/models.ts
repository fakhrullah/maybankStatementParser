export interface AccountModel {
  name: string
  isBank: boolean
  bank?: {
    name: string
    number: string
  }
}

export interface TransactionModel {
  account: AccountModel
  date: Date
  // integer & cents
  value: number
  // integer & cents
  balance: number
  type: 'income' | 'outgoing' | 'brought-forward' | 'carried-forward'
  description: string
  moreDetail: string
}

export type LineState = 'money' | 'date' | 'desc' | 'detail' | 'full_date' | undefined;

export interface TransactionValueModel {
  value: number
  // Brought forward is starting balance take from previous
  // Carried forward is end balance that will be brought forward
  type: 'income' | 'outgoing' | 'brought-forward' | 'carried-forward'
  balance?: number
}

export type TransactionDescription = {
  text: string
  index: number
};
