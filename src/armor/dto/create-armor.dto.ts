import { IsInt, IsPositive, IsString, IsUrl, Min, MinLength } from "class-validator";

export class CreateArmorDto {

    @IsPositive()
    @IsInt()
    @Min(1)
    no: number; 

    @IsString()
    @MinLength(1)
    name: string;

    @IsUrl()
    @MinLength(1)
    url: string;
}