import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharsModule } from './chars/chars.module';

@Module({
  imports: [CharsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
