// studyScheduleId | userId | courseId | scheduleDate        | completed    COURSE ORDER
// ------------------------------------------------------------------------
// 1              | 1      | 1        | 2023-05-15 10:00:00 | true          1  
// 2              | 1      | 2        | 2023-05-16 14:00:00 | false         2     
// 3              | 1      | 3        | 2023-05-17 12:00:00 | false         5
// 4              | 1      | 4        | 2023-05-18 16:00:00 | false         3
// 5              | 1      | 5        | 2023-05-19 18:00:00 | false         4

import { Column, Entity, PrimaryColumn, OneToMany, JoinColumn} from 'typeorm'
import { ManyToOne, ManyToMany } from 'typeorm'; 

import { Users } from '../user/user.model'
import { Courses } from '../course/course.model'

@Entity(
    'studyschedule'
)
export class StudySchedule {
    @PrimaryColumn({unique: true, primary: true})
    id: string;

    @ManyToOne(() => Users)
    user: Users;

    @Column({type: 'varchar', length: 255})
    useremail: string;

    @ManyToOne(() => Courses)
    course: Courses;

    @Column({type: 'varchar', length: 255})
    coursename: string;

    @Column({type: 'boolean'})
    completecourse: boolean;

    @Column({type: 'bigint'})
    courseorder: number;
}