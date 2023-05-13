import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateUserDto {

    @ApiProperty()
    @IsString()
    fullName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string;
}