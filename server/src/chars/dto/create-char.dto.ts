import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { EFraction } from 'src/utils/constants';

export class CreateCharDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    server: string;

    @IsNotEmpty()
    @IsString()
    @IsEnum(EFraction)
    fraction: string;

    portrait: string | null
}
