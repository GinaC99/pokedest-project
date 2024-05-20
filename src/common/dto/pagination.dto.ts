import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class PaginatioDto {

    @IsPositive()
    @IsOptional()
    @IsNumber()
    @Min(1)
    limit?: number;

    
    @IsOptional()
    @IsPositive()
    @IsNumber()
    @Min(1)
    offset?: number;
}