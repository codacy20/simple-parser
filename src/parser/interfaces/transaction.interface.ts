export interface ITransaction {
  accountNumber: string;
  description: string;
  endBalance: number;
  mutation: number;
  reference: number;
  startBalance: number;
}
