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
    console.log('check Refrene ' + check + ' ' + transaction.reference);
    return check;
  }

  private checkBalance(element: ITransaction): boolean {
    let check = false;
    if (element.endBalance < 0) {
      check = true;
    } else {
      check = false;
    }
    console.log('check Balance ' + check);
    return check;
  }

  public async findAll(): Promise<ITransaction[]> {
    return this.faultyTransactions;
  }
}
