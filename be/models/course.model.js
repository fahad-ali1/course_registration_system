import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  courseID: { type: Number, required: true},
  courseName: { type: String, required: true },
  department: { type: String, required: true },
  timeOfDay: { type: String, required: true },
});

const Course = mongoose.model("Course", courseSchema);

export default Course;