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
        const course = await Student.findOne(query);
        return course;
    } catch (e) {
        throw Error("Error while fetching student!");
    }
}