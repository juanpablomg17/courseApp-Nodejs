import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional} from "class-validator";


export class GetStudyScheduleDto {
    @ApiProperty()
    userId: string;

    @ApiProperty()
    @IsArray()
    @IsOptional()
    courses?: courses[];
}


interface courses {
    courseName: string,
    order: number
}