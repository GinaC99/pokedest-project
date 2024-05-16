import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDto {

    @IsInt()
    @Min(0)
    @IsPositive()
    no: number;
    
    @IsString()
    @MinLength(1)
    name: string;
}
