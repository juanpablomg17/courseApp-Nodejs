import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class GetCourseDto {


    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsString()
    name: string;
}