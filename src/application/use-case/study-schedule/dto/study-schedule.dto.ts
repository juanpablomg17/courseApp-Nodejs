import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsUUID } from "class-validator";

export class StudyScheduleDto {
    @ApiProperty()
    @IsNotEmpty()
    userId: string;

    @ApiProperty()
    @IsArray()
    @IsNotEmpty()
    courses: courses[];
}


interface courses {
    desiredCourse: string,
    requiredCourse: string
}