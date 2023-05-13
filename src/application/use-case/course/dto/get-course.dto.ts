import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class GetCourseDto {


    @ApiProperty()
    @IsString()
    @IsOptional()
    id?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    name?: string;
}


export type TypeGetCourseDto = GetCourseDto