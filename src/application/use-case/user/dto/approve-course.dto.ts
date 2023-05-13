import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ApproveCourseDto {

    @ApiProperty()
    @IsString()
    fullname: string;

    @ApiProperty()
    @IsString()
    email: string;
}