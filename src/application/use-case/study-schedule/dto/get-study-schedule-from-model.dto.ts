import { ApiProperty } from "@nestjs/swagger";
import { Users } from '../../../../infrastucture/repository/user/user.model'


export class GetStudyScheduleFromModelDto {
    @ApiProperty()
    user: Users;
}

export type getStudyScheduleFromModelDtoType = GetStudyScheduleFromModelDto;