import { Module } from '@nestjs/common';
import { CharsService } from './chars.service';
import { CharsController } from './chars.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ExistingCharValidationInterceptor } from 'src/interceptors/existingChar.interceptor';
import { ExistingCharRule } from 'src/validators/char.validator';

@Module({
  imports: [],
  controllers: [CharsController],
  providers: [CharsService, ExistingCharRule]
})
export class CharsModule { }
