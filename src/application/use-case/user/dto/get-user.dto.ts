import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class GetUserDto {

    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsString()
    fullName: string;

    @ApiProperty()
    @IsString()
    email: string;
}