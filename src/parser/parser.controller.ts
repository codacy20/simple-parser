import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ParserService } from './parser.service';
import { TransactionDto } from '../parser/dto/transactionDto.dto';
import { ITransaction } from '../parser/interfaces/transaction.interface';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('parser')
export class ParserController {
  constructor(private readonly parserService: ParserService) {}

  @Get()
  async findAll(): Promise<ITransaction[]> {
    return this.parserService.findAll();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('fileKey'))
  uploadFile(@UploadedFile() file) {
    console.log(file);
  }

  @Post()
  async create(@Body() transactionDtoList: TransactionDto[]) {
    return this.parserService.create(transactionDtoList);
  }
}
