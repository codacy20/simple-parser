import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParserController } from './parser/parser.controller';
import { ParserService } from './parser/parser.service';
import { ParserModule } from './parser/parser.module';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [ParserModule],
  controllers: [AppController, ParserController],
  providers: [AppService, ParserService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '/', method: RequestMethod.ALL });
  }
}
