import { Transform } from 'class-transformer';

export class Char {
    id: string
    name: string;
    server: string;
    @Transform(({ value }) => value.getTime())
    createdAt: Date | number;

    @Transform(({ value }) => value.getTime())
    updatedAt: Date | number;

    portrait: File | string | null

    /* constructor(name:string, server:string, portrait:File|string|null){    
            this.name=name;
            this.server=server;
            this.portrait=portrait    
        } */
}
