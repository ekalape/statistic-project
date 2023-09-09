import { Type } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsPositive, IsString, Max, ValidateNested } from 'class-validator';
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

export class CreateStatDto {

    // @IsDateString({ strict: true })
    date: string //yyyy-mm-dd

    @IsNotEmpty()
    amount: number

    @IsNotEmpty()
    belongTo: string

}
