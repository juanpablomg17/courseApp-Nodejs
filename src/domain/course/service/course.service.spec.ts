import { Test } from '@nestjs/testing';
import { CourseService } from './course.service';

describe('CourseService', () => {
    let courseService: CourseService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [CourseService],
        }).compile();

        courseService = moduleRef.get<CourseService>(CourseService);
    });
    
    describe('orderByDependency', () => {
        it('should return an array with courses ordered by dependency', () => {
            const courses = [
                { desiredCourse: 'PortfolioConstruction', requiredCourse: 'PortfolioTheories' },
                { desiredCourse: 'InvestmentManagement', requiredCourse: 'Investment' },
                { desiredCourse: 'Investment', requiredCourse: 'Finance' },
                { desiredCourse: 'PortfolioTheories', requiredCourse: 'Investment' },
                { desiredCourse: 'InvestmentStyle', requiredCourse: 'InvestmentManagement' },
            ];
            const expected = ["Finance", "Investment", "PortfolioTheories", "PortfolioConstruction", "InvestmentManagement", "InvestmentStyle"];
            const result = courseService.orderByDependency(courses);
            expect(result).toEqual(expected);
        });
    });
});
