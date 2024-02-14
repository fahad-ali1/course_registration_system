import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  studentId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

const Student = mongoose.model("Student", studentSchema);

export default Student;