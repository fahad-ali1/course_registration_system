import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  studentID: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // Work in progress to create many to many relationship
  // registeredCourses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
  registeredCourses: []
});

const Student = mongoose.model('Student', studentSchema);

export default Student;