import Student from "../models/student.model.js";
import Course from "../models/course.model.js";

export const getAllCoursesFromRepo = async (query) => {
    try {
        const courses = await Course.find(query);
        return courses;
    } catch (e) {
        throw Error("Error while fetching courses!");
    }
}

export const registerCourseFromRepo = async (query) => {
    try {
        const course = await Course.findOneAndUpdate(query, { registered: true }, { new: true });
        return course;
    } catch (e) {
        throw Error("Error while registring course(s)!");
    }
}

export const unregisterCourseFromRepo = async (query) => {
    try {
        const course = await Course.findOneAndUpdate(query, { registered: false }, { new: true });
        return course;
    } catch (e) {
        throw Error("Error while unregistring course(s)!");
    }
}