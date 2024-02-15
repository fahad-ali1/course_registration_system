import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  studentID: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  registeredCourses: []
});

const Student = mongoose.model("Student", studentSchema);

export default Student;