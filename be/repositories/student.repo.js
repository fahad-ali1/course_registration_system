import Student from "../models/student.model.js";

export const getAllStudentsFromRepo = async (query) => {
    try {
        const students = await Student.find(query);
        return students;
    } catch (e) {
        throw Error("Error while fetching students!");
    }
}

export const getStudentFromRepo = async (query) => {
    try {
        const student = await Student.findOne(query);
        return student;
    } catch (e) {
        throw Error("Error while fetching student!");
    }
}

export const getRegisteredCoursesFromRepo = async (query) => {
    try {
        const student = await Student.findOne(query);
        return student.registeredCourses;
    } catch (e) {
        throw Error("Error while getting registered course(s)!");
    }
}