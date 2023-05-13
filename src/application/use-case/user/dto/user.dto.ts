import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class UserDto {
    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsString()
    fullName: string;

    @ApiProperty()
    @IsString()
    email: string;
}