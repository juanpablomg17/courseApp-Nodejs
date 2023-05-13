import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class EnrollCourseDto {

    @ApiProperty()
    @IsString()
    fullname: string;

    @ApiProperty()
    @IsString()
    email: string;
}