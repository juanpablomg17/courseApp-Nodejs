import { Injectable } from "@nestjs/common";


interface Course {
  desiredCourse: string;
  requiredCourse: string;
}


@Injectable()
export class CourseService {

  /**
* Given a list of courses and their dependencies, returns an array with the names of the courses in the order they should be taken based on their dependencies.
* @param courses An array of courses with their desired course and required course.
* @returns An array with the names of the courses in the order they should be taken.
*/
  orderByDependency(courses: Course[]): string[] {
    // Create a dictionary to keep track of the dependencies of each course.
    const courseDict: { [key: string]: Set<string> } = {};

    // Iterate over the courses and add them to the dictionary.
    courses.forEach((course) => {
      // If the desired course is not in the dictionary, add it with an empty set of dependencies.
      if (!courseDict[course.desiredCourse]) {
        courseDict[course.desiredCourse] = new Set<string>();
      }

      // If the required course is specified, add it to the dictionary as a dependency of the desired course.
      if (course.requiredCourse) {
        // If the required course is not in the dictionary, add it with an empty set of dependencies.
        if (!courseDict[course.requiredCourse]) {
          courseDict[course.requiredCourse] = new Set<string>();
        }

        // Add the required course as a dependency of the desired course.
        courseDict[course.desiredCourse].add(course.requiredCourse);
      }
    });

    // Create an array to hold the result.
    const result: string[] = [];

    // Create a dictionary to keep track of which courses have been visited.
    const visited: { [key: string]: boolean } = {};

    // Recursive function to visit each course and its dependencies.
    function visit(course: string) {
      // If the course has already been visited, return.
      if (visited[course]) {
        return;
      }

      // Mark the course as visited.
      visited[course] = true;

      // If the course has any dependencies, visit them recursively.
      if (courseDict[course]) {
        courseDict[course].forEach((dependency) => {
          visit(dependency);
        });
      }

      // Add the course to the result array.
      result.push(course);
    }

    // Visit each course in the dictionary to generate the result array.
    Object.keys(courseDict).forEach((course) => {
      visit(course);
    });

    // Return the result array.
    return result;
  }


}



