import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { CreateCharDto } from 'src/chars/dto/create-char.dto';
import { ExistingCharRule } from 'src/validators/char.validator';

@Injectable()
export class ExistingCharValidationInterceptor implements NestInterceptor {
  constructor(private existingCharRule: ExistingCharRule) { }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const body: CreateCharDto = request.body;

    console.log("<---- inside interceptor --->", body)

    const validationResult = await this.existingCharRule.validate(body);
    console.log("validator says ---> ", validationResult)
    if (!validationResult) {
      throw new BadRequestException("Such character already exists")
    }

    return next.handle().pipe(map(data => data));
  }
}
