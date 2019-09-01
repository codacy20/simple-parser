import { Injectable } from '@nestjs/common';
import { TransactionDto } from '../parser/dto/transactionDto.dto';
import { ITransaction } from '../parser/interfaces/transaction.interface';
import { ICheck } from './interfaces/check.interface';

@Injectable()
export class ParserService {
  healthyTransactions: ITransaction[];
  faultyTransactions: ITransaction[];
  checks: ICheck;
  constructor() {
    this.healthyTransactions = [];
    this.faultyTransactions = [];
    this.checks = { balance: false, transactionReference: false };
  }

  public async create(
    transactionList: TransactionDto[],
  ): Promise<ITransaction[]> {
    this.checkTransaction(transactionList);
    return this.faultyTransactions;
  }

  public checkTransaction(transactionList: ITransaction[]): ITransaction[] {
    transactionList.forEach(element => {
      this.checks.transactionReference = this.checkTransactionReference(
        element,
      );
      this.checks.balance = this.checkBalance(element);
      if (this.checks.balance || this.checks.transactionReference) {
        this.faultyTransactions.push(element);
      } else {
        this.healthyTransactions.push(element);
      }
    });
    return transactionList;
  }

  private checkTransactionReference(transaction: ITransaction) {
    let check = false;
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.healthyTransactions.length; index++) {
      if (this.healthyTransactions[index].reference === transaction.reference) {
        check = true;
      }
    }
    return check;
  }

  private checkBalance(element: ITransaction): boolean {
    let check = false;
    const startAbs = Math.abs(element.startBalance);
    const mutationAbs = Math.abs(element.mutation);
    const endAbs = Math.abs(element.endBalance);
    let endRounded = 0;

    if (element.mutation > 0) {
      endRounded = Math.round((startAbs + mutationAbs) * 100) / 100;
    } else {
      endRounded = Math.round((startAbs - mutationAbs) * 100) / 100;
    }

    if (element.endBalance < 0) {
      check = true;
    } else {
      if (endRounded === endAbs) {
        check = false;
      } else {
        check = true;
      }
    }

    return check;
  }

  public async findAll(): Promise<ITransaction[]> {
    return this.faultyTransactions;
  }
}
