import express from "express";
import { getAllCourses, getCourse } from "../controllers/course.controller.js";
import { getAllStudents, getStudent, registerCourse, unregisterCourse, getRegisteredCourses } from "../controllers/student.controller.js";
const router = express.Router();

// Courses
router.get('/courses', getAllCourses);
router.get('/courses/:courseID', getCourse);

// Enroll and unenroll students
router.post('/students/:studentID/courses/:courseID/enroll', registerCourse);
router.post('/students/:studentID/courses/:courseID/unenroll', unregisterCourse);
router.get('/:studentID/courses', getRegisteredCourses);

// Students
router.get('/students', getAllStudents);
router.get('/students/:studentID', getStudent);

export default router;