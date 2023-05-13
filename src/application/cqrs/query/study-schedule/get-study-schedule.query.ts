import { GetStudyScheduleFromModelDto } from "../../../use-case/study-schedule/dto/get-study-schedule-from-model.dto";

export class GetStudyScheduleQuery {
    constructor(
        public params?: GetStudyScheduleFromModelDto
    ) { }
}
