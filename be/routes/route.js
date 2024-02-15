import express from "express";
import { getAllCourses, getCourse, registerCourse, unregisterCourse } from "../controllers/course.controller.js";
import { getAllStudents, getStudent, getRegisteredCourses } from "../controllers/student.controller.js";
const router = express.Router();

// Courses
router.get('/courses', getAllCourses);
router.get('/courses/:courseID', getCourse);
router.post('/:studentID/courses/enroll', registerCourse);
router.post('/:studentID/courses/unenroll', unregisterCourse);
router.get('/:studentID/courses', getRegisteredCourses);

// Students
router.get('/students', getAllStudents);
router.get('/students/:studentID', getStudent);

export default router;