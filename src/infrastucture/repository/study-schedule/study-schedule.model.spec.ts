import { StudySchedule } from './study-schedule.model';
import { Courses } from '../course/course.model'
import { Users } from '../user/user.model'

describe('StudySchedule', () => {
  it('should be return undefined, id not set', () => {
    const studySchedule = new StudySchedule();
    expect(studySchedule.id).toBeUndefined();
  });

  it('should be defined', () => {
    const studySchedule = new StudySchedule();
    studySchedule.id = '1';
    expect(studySchedule).toBeDefined();
    expect(studySchedule.id).toBeDefined();
    expect(studySchedule.id).toEqual("1");
  });

  it('should have a user', () => {
    const studySchedule = new StudySchedule();
    const user = new Users();
    user.id = '1';
    user.fullname = 'John Doe';
    user.email = 'x@x.com';
    studySchedule.user = user;
    
    expect(studySchedule.user).toBeDefined();
    expect(studySchedule.user.id).toBe('1');
    expect(studySchedule.user.fullname).toBe('John Doe');
    expect(studySchedule.user.email).toBe('x@x.com');
  });

  it('should have a useremail', () => {
    const studySchedule = new StudySchedule();
    studySchedule.useremail = 'x@x.com';
    expect(studySchedule.useremail).toBeDefined();
    expect(studySchedule.useremail).toBe('x@x.com');
  });

  it('should have a course', () => {
    const studySchedule = new StudySchedule();
    const course = new Courses();
    course.id = '1';
    course.name = 'Course 1';
    studySchedule.course = course;
    expect(studySchedule.course).toBeDefined();
    expect(studySchedule.course.id).toBe('1');
    expect(studySchedule.course.name).toBe('Course 1');
  });

  it('should have a coursename', () => {
    const studySchedule = new StudySchedule();
    studySchedule.coursename = 'Course 1';
    expect(studySchedule.coursename).toBeDefined();
    expect(studySchedule.coursename).toBe('Course 1');
  });

  it('should have a completecourse', () => {
    const studySchedule = new StudySchedule();
    studySchedule.completecourse = true;
    expect(studySchedule.completecourse).toBeDefined();
    expect(studySchedule.completecourse).toBe(true);
  });

  it('should have a courseorder', () => {
    const studySchedule = new StudySchedule();
    studySchedule.courseorder = 1;
    expect(studySchedule.courseorder).toBeDefined();
    expect(studySchedule.courseorder).toBe(1);
  });

});