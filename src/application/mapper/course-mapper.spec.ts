import { CouseMapper } from "./course-mapper";
import { CourseDto } from "../use-case/course/dto/course.dto";
import { GetCourseDto } from "../use-case/course/dto/get-course.dto";

describe('CourseMapper', () => {
    describe('toPersistance', () => {
        it('should map CourseDto to Courses model', () => {
            const courseDto: CourseDto = {
                name: 'test course'
            };
            const coursesModel = CouseMapper.toPersistance(courseDto);
            expect(coursesModel.id).toBeDefined();
            expect(coursesModel.name).toEqual(courseDto.name);
        });

        it('should map GetCourseDto to Courses model', () => {
            const getCourseDto: GetCourseDto = {
                id: '1',
                name: 'test course'
            };
            const coursesModel = CouseMapper.toPersistance(getCourseDto);
            expect(coursesModel.id).toBeDefined();
            expect(coursesModel.name).toEqual(getCourseDto.name);
        });
    });

    describe('toModel', () => {
        it('should map GetCourseDto to Courses model', () => {
            const getCourseDto: GetCourseDto = {
                id: '1',
                name: 'test course'
            };
            const coursesModel = CouseMapper.toModel(getCourseDto);
            expect(coursesModel.id).toEqual(getCourseDto.id);
            expect(coursesModel.name).toEqual(getCourseDto.name);
        });
    });
});
