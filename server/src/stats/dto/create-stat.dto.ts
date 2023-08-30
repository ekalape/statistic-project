import { IsNotEmpty } from 'class-validator';

export class CreateStatDto {

    @IsNotEmpty()
    day: Date | string;

    @IsNotEmpty()
    amount: number

    @IsNotEmpty()
    belongTo: string

}
