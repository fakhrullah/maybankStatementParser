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
  type: 'income' | 'outgoing'
  description: string
  moreDetail: string
}

export type LineState = 'money' | 'date' | 'desc' | 'detail' | 'full_date' | undefined;

export interface TransactionValueModel {
  value: number,
  type: 'income' | 'outgoing',
  balance?: number
}
