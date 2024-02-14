import express from "express";
import { getAllCourses, registerCourse, unregisterCourse } from "../controllers/course.controller.js";
// import { Student } from "../controllers/student.controller.js";
const router = express.Router();

// Courses
router.get('/courses', getAllCourses);
router.post('/courses/enroll', registerCourse);
router.post('/courses/unenroll', unregisterCourse);

// Students
// router.get('/students/:studentId/courses', getStudentCourses);
// router.post('/students/:studentId/courses/enroll', enrollCourse);
// router.post('/students/:studentId/courses/unenroll', SunenrollCourse);

export default router;