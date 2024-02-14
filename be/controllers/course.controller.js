import { getAllCoursesFromRepo, registerCourseFromRepo } from '../repositories/course.repo.js';
  
// Handle errors
const handleError = (res, status, message) => {
    res.status(status).send(message);
    };
  
// Gets all the courses list from the database
export const getAllCourses = async (req, res) => {
    try {
        const courses = await getAllCoursesFromRepo();
        res.status(200).send(courses);
    } catch (e) {
        handleError(res, 500, `Failed to fetch a list of courses: ${e.message}`);
    }
}
  
// Register a course
export const registerCourse = async (req, res) => {
    const { studentId } = req.params;
    const { courseId } = req.body;
    try {
      const result = await registerCourseFromRepo(studentId, courseId);
      if (!result) {
        handleError(res, 404, `Failed to register course ${courseId} for student ${studentId}`);
      } else {
        res.status(200).send(result);
      }
    } catch (e) {
      handleError(res, 500, `Failed to register course: ${e.message}`)
    }
}

// Register a course
export const unregisterCourse = async (req, res) => {
    const { studentId } = req.params;
    const { courseId } = req.body;
    try {
      const result = await unregisterCourseFromRepo(studentId, courseId);
      if (!result) {
        handleError(res, 404, `Failed to register course ${courseId} for student ${studentId}`);
      } else {
        res.status(200).send(result);
      }
    } catch (e) {
      handleError(res, 500, `Failed to register course: ${e.message}`)
    }
}
