import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class GetUserDto {

    @ApiProperty()
    @IsString()
    @IsOptional()
    id?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    fullname?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    email?: string;
}

export type TypeGetUserDto = GetUserDto