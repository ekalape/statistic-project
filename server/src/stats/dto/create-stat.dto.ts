import { IsNotEmpty, IsPositive, Max, ValidateNested } from 'class-validator';

export class CreateStatDto {

    dayData: DayDataDto

    @IsNotEmpty()
    amount: number

    @IsNotEmpty()
    belongTo: string

}

class DayDataDto {
    @IsPositive()
    @Max(31)
    day: number;

    @IsPositive()
    @Max(11)
    month: number;

    @IsPositive()
    year: number;
}