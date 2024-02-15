import Student from "../models/student.model.js";

export const getAllStudentsFromRepo = async () => {
    try {
        const students = await Student.find();
        return students;
    } catch (e) {
        throw Error("Error while fetching students!");
    }
}

export const getStudentFromRepo = async (studentID) => {
    try {
        const student = await Student.findOne(studentID);
        return student;
    } catch (e) {
        throw Error("Error while fetching student!");
    }
}

export const registerCourseFromRepo = async (studentID, courseID) => {
    try {
        const student = await Student.findOne(studentID);

        if (!student.registeredCourses.includes(courseID)) {
            student.registeredCourses.push(courseID);
        } else {
            throw Error("Already registered");
        }
        await student.save();
        return student;
    } catch (e) {
        throw Error(`Error while registering course(s): ${e.message}`);
    }
}

export const unregisterCourseFromRepo = async (studentID, courseID) => {
    try {
        const student = await Student.findOne(studentID);
        const index = student.registeredCourses.indexOf(courseID);

        if (index !== -1) {
            student.registeredCourses.splice(index, 1);
        } else {
            throw Error("Not registered for this course!");
        }
        await student.save();
        return student;
    } catch (e) {
        throw Error(`Error while unregistering course(s): ${e.message}`);
    }
}

export const getRegisteredCoursesFromRepo = async (studentID) => {
    try {
        const student = await Student.findOne(studentID);
        return student.registeredCourses;
    } catch (e) {
        throw Error("Error while getting registered course(s)!");
    }
}