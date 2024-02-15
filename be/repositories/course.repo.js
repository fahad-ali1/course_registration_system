import Course from "../models/course.model.js";

export const getAllCoursesFromRepo = async () => {
    try {
        const courses = await Course.find();
        return courses;
    } catch (e) {
        throw Error("Error while fetching courses!");
    }
}

export const getCourseFromRepo = async (query) => {
    try {
        const course = await Course.findOne(query);
        return course;
    } catch (e) {
        throw Error("Error while fetching course!");
    }
}