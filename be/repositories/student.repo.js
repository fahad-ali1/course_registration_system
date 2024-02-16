import Student from "../models/student.model.js";
import Course from "../models/course.model.js"

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
export const registerCourseFromRepo = async (query) => {
    const { studentID, courseID } = query;
    try {
        const student = await Student.findOne({ studentID: studentID });
        const course = await Course.findOne({ courseID: courseID }); 

        // Check for time conflicts
        const newCourseTime = course.timeOfDay;
        const registeredCourses = await Course.find({ courseID: { $in: student.registeredCourses } });

        // If they are not already enrolled, then enroll them
        if (!student.registeredCourses.includes(course.courseID)) {
            student.registeredCourses.push(course.courseID);
        } else {
            throw Error(`Already registered in ${course.courseName}`);
        }
        for (const registeredCourse of registeredCourses) {
            if (registeredCourse.timeOfDay === newCourseTime) {
                throw Error(`Time conflict at ${registeredCourse.timeOfDay} with ${registeredCourse.courseName}!`);
            }
        }

        await student.save();
        await course.save();
        return student, course;
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