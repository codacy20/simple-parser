enum Mutation {
  addition,
  deduction,
}

export interface ITransaction {
  transactionReference: number;
  accountNumber: string;
  startBalance: number;
  endBalance: number;
  description: string;
  mutation: Mutation;
}
