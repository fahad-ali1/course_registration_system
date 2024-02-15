import { getAllStudentsFromRepo, getStudentFromRepo } from '../repositories/student.repo.js';

// Handle student not found
const handleStudentNotFound = (res, studentID) => {
    handleError(res, 404, `Student with ID ${studentID} not found`);
};

// Handle errors
const handleError = (res, status, message) => {
    res.status(status).send(message);
};

// Gets all the students list from the database
export const getAllStudents = async (req, res) => {
    try {
        const students = await getAllStudentsFromRepo();
        res.status(200).send(students);
    } catch (e) {
        handleError(res, 500, `Failed to fetch a list of students: ${e.message}`);
    }
}

// Get a single course by its ID
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
};