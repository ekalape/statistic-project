import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCharDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    server: string;

    portrait: string | null
}
