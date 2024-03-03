import React from 'react';

function CourseInformation({
  students,
  selectedStudentRegister,
  handleStudentRegister,
  renderRegisterTableColumns,
  renderCourses,
}) {
  return (
    <div className='registerCourse'>
      <h1>Enroll in New Courses</h1>
      <select className='studentRegisterMenu' value={selectedStudentRegister} onChange={handleStudentRegister}>
        <option value="">Select Student to Enroll in Courses</option>
        {students.map((student) => (
          <option key={student._id} value={student.studentID}>
            {student.name}
          </option>
        ))}
      </select>
      <table className='courseRegisterTable'>
        <thead>{renderRegisterTableColumns()}</thead>
        <tbody>{renderCourses()}</tbody>
      </table>
    </div>
  );
}

export default CourseInformation;