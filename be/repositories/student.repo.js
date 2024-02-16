import Student from "../models/student.model.js";

// Gets all the students list from the database
export const getAllStudentsFromRepo = async () => {
    try {
        const students = await Student.find();
        return students;
    } catch (e) {
        throw Error("Error while fetching students!");
    }
}

// Get a single student by its ID
export const getStudentFromRepo = async (studentID) => {
    try {
        const student = await Student.findOne(studentID);
        return student;
    } catch (e) {
        throw Error("Error while fetching student!");
    }
}

// Register a student to a course by their ID and courseID
export const registerCourseFromRepo = async (studentID, courseID) => {
    try {
        const student = await Student.findOne(studentID);
        // If they are not already enrolled, then enroll them
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

// Unegister a student to a course by their ID and courseID
export const unregisterCourseFromRepo = async (studentID, courseID) => {
    try {
        const student = await Student.findOne(studentID);
        const index = student.registeredCourses.indexOf(courseID);
        // If they are not enrolled, then show error that they are not
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

// Get all registered courses from a student by their ID
export const getRegisteredCoursesFromRepo = async (studentID) => {
    try {
        const student = await Student.findOne(studentID);
        return student.registeredCourses;
    } catch (e) {
        throw Error("Error while getting registered course(s)!");
    }
}