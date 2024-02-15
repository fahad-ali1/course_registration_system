import { getAllCoursesFromRepo, getCourseFromRepo } from '../repositories/course.repo.js';

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