import { Type } from 'class-transformer';
import { IsNotEmpty, IsPositive, Max, ValidateNested } from 'class-validator';
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

    @ValidateNested()
    @Type(() => DayDataDto)
    dayData: DayDataDto

    @IsNotEmpty()
    amount: number

    @IsNotEmpty()
    belongTo: string

}
