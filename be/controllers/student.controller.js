import { getAllStudentsFromRepo, getStudentFromRepo, registerCourseFromRepo, unregisterCourseFromRepo, getRegisteredCoursesFromRepo } from '../repositories/student.repo.js';

// Handle student not found
const handleStudentNotFound = (res, studentID) => {
    handleError(res, 404, `Student with ID ${studentID} not found`);
};

// Handle errors
const handleError = (res, status, message) => {
    res.status(status).send(message);
};

// Call function from repo for all students
export const getAllStudents = async (req, res) => {
    try {
        const students = await getAllStudentsFromRepo();
        res.status(200).send(students);
    } catch (e) {
        handleError(res, 500, `Failed to fetch a list of students: ${e.message}`);
    }
}

// Call function from repo for a single student by its ID
export const getStudent = async (req, res) => {
    const { studentID } = req.params;
    try {
        const student = await getStudentFromRepo({ studentID: studentID });
        if (!student) {
            handleStudentNotFound(res, studentID);
        } else {
            res.status(200).send(student);
        }
    } catch (e) {
        handleError(res, 500, `Failed to fetch student ${studentID}: ${e.message}`);
    }
}

// Call function from repo to register a student to a course (both params needed)
export const registerCourse = async (req, res) => {
    const { studentID, courseID } = req.params;
    try {
        const registerCourse = await registerCourseFromRepo({studentID}, parseInt(courseID));
        res.status(200).send(registerCourse);
    } catch (e) {
        handleError(res, 500, `Failed to register course(s): ${e.message}`);
    }
}

// Call function from repo to unregister a student to a course (both params needed)
export const unregisterCourse = async (req, res) => {
    const { studentID, courseID } = req.params;
    try {
        const unregisterCourse = await unregisterCourseFromRepo({studentID}, parseInt(courseID));
        res.status(200).send(unregisterCourse);
    } catch (e) {
        handleError(res, 500, `Failed to unregister course(s): ${e.message}`);
    }
}

// Call function from repo to show all registered students by student ID
export const getRegisteredCourses = async (req, res) => {
    const { studentID } = req.params;
    try {
        const registeredCourses = await getRegisteredCoursesFromRepo(studentID);
        res.status(200).send(registeredCourses);
    } catch (e) {
        handleError(res, 500, `Failed to fetch registered course(s: ${e.message}`);
    }
}