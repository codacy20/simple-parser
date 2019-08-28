import { Controller, Get, Post, Body } from '@nestjs/common';
import { ParserService } from './parser.service';
import { TransactionDto } from '../parser/dto/transactionDto.dto';
import { ITransaction } from '../parser/interfaces/transaction.interface';

@Controller('parser')
export class ParserController {
  constructor(private readonly parserService: ParserService) {}

  @Get()
  async findAll(): Promise<ITransaction[]> {
    return this.parserService.findAll();
  }

  @Post()
  async create(@Body() transactionDtoList: TransactionDto[]) {
    return this.parserService.create(transactionDtoList);
  }
}
