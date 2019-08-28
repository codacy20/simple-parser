enum Mutation {
  addition,
  deduction,
}

export class TransactionDto {
  readonly transactionReference: number;
  readonly accountNumber: string;
  readonly startBalance: number;
  readonly endBalance: number;
  readonly description: string;
  readonly mutation: Mutation;
}
