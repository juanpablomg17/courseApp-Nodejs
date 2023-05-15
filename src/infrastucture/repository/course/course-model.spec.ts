import { Courses } from './course.model';

describe('Courses', () => {
  it('should have a unique id', () => {
    const course = new Courses();
    expect(course.id).toBeUndefined();
  });

  it('should have a unique name', () => {
    const course = new Courses();
    course.name = 'test';
    expect(course.name).toBe("test");
  });
});