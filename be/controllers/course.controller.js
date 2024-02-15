import { getAllCoursesFromRepo, getCourseFromRepo, registerCourseFromRepo, unregisterCourseFromRepo } from '../repositories/course.repo.js';

// Handle course not found
const handleCourseNotFound = (res, courseID) => {
    handleError(res, 404, `Course with ID ${courseID} not found`);
};

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

// Get a single course by its ID
export const getCourse = async (req, res) => {
  const { courseID } = req.params;
  try {
    const course = await getCourseFromRepo({ courseID: courseID });
    if (!course) {
      handleCourseNotFound(res, courseID);
    } else {
      res.status(200).send(course);
    }
  } catch (e) {
    handleError(res, 500, `Failed to fetch course: ${e.message}`);
  }
};
  
// Register a course
export const registerCourse = async (req, res) => {
    const { studentID } = req.params;
    const { courseID } = req.body;
    try {
      const result = await registerCourseFromRepo(studentID, courseID);
      if (!result) {
        handleError(res, 404, `Failed to register course ${courseID} for student ${studentID}`);
      } else {
        res.status(200).send(result);
      }
    } catch (e) {
      handleError(res, 500, `Failed to register course: ${e.message}`)
    }
}

// Unregister a course
export const unregisterCourse = async (req, res) => {
    const { studentID } = req.params;
    const { courseID } = req.body;
    try {
      const result = await unregisterCourseFromRepo(studentID, courseID);
      if (!result) {
        handleError(res, 404, `Failed to register course ${courseID} for student ${studentID}`);
      } else {
        res.status(200).send(result);
      }
    } catch (e) {
      handleError(res, 500, `Failed to register course: ${e.message}`)
    }
}