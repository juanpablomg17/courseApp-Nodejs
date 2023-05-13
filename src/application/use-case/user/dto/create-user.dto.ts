import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateUserDto {

    @ApiProperty()
    @IsString()
    fullname: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string;
}