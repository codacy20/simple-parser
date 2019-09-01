export interface ITransaction {
  accountNumber: string;
  description: string;
  endBalance: number;
  mutation: string;
  reference: number;
  startBalance: number;
}
