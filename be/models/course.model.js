import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  courseId: { type: Number, required: true, unique: true},
  courseName: { type: String, required: true },
  department: { type: String, required: true },
  timeOfDay: { type: String, required: true },
});

const Course = mongoose.model("Course", courseSchema);

export default Course;