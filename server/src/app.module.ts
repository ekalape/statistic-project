import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharsModule } from './chars/chars.module';
import { StatsModule } from './stats/stats.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';

@Module({
  imports: [CharsModule, StatsModule, ConfigModule.forRoot({ isGlobal: true }), DbModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
