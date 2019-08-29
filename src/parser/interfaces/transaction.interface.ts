enum Mutation {
  addition,
  deduction,
}

interface IMutation {
  operation: Mutation;
  amount: number;
}

export interface ITransaction {
  transactionReference: number;
  accountNumber: string;
  startBalance: number;
  endBalance: number;
  description: string;
  mutation: IMutation;
}
