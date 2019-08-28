import { Injectable } from '@nestjs/common';
import { TransactionDto } from '../parser/dto/transactionDto.dto';
import { ITransaction } from '../parser/interfaces/transaction.interface';
import { ICheck } from './interfaces/check.interface';

@Injectable()
export class ParserService {
  transactions: ITransaction[];
  faultyTransactions: ITransaction[];
  checks: ICheck;
  constructor() {
    this.transactions = [];
    this.faultyTransactions = [];
    this.checks = { balance: false, transactionReference: false };
  }

  public async create(
    transactionList: TransactionDto[],
  ): Promise<ITransaction[]> {
    this.checkTransaction(transactionList);
    return this.transactions;
  }

  public checkTransaction(transactionList: ITransaction[]): ITransaction[] {
    transactionList.forEach(element => {
      if (element) {
        this.checks.transactionReference = this.checkTransactionReference(
          element,
        );
        this.checks.balance = this.checkBalance(element);
        if (this.checks.balance || this.checks.transactionReference) {
          this.faultyTransactions.push(element);
        } else {
          this.transactions.push(element);
        }
      }
    });
    return transactionList;
  }

  private checkTransactionReference(transaction: ITransaction) {
    let check = false;
    if (this.transactions.length === 0) {
      this.transactions.push(transaction);
    }
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.transactions.length; index++) {
      if (
        this.transactions[index].transactionReference ===
        transaction.transactionReference
      ) {
        check = true;
      }
    }
    return check;
  }

  private checkBalance(element: ITransaction): boolean {
    let check = false;
    if (element.startBalance < element.endBalance || element.endBalance < 0) {
      check = true;
    } else {
      check = false;
    }
    return check;
  }

  public async findAll(): Promise<ITransaction[]> {
    return this.transactions;
  }
}
