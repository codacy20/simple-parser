enum Mutation {
  addition,
  deduction,
}

interface IMutation {
  operation: Mutation;
  amount: number;
}

export class TransactionDto {
  readonly transactionReference: number;
  readonly accountNumber: string;
  readonly startBalance: number;
  readonly endBalance: number;
  readonly description: string;
  readonly mutation: IMutation;
}
