import Course from "../models/course.model.js";

//  Get all courses from database
export const getAllCoursesFromRepo = async () => {
    try {
        const courses = await Course.find();
        return courses;
    } catch (e) {
        throw Error("Error while fetching courses!");
    }
}

//  Get a course from database
export const getCourseFromRepo = async (courseID) => {
    try {
        const course = await Course.findOne(courseID);
        return course;
    } catch (e) {
        throw Error("Error while fetching course!");
    }
}