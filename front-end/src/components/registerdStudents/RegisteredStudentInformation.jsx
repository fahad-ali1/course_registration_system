import React from 'react';

function RegisteredStudentInformation({
  students,
  selectedStudentRegistered,
  handleStudentRegistered,
  renderRegisteredTableColumns,
  renderRegisteredCourses,
}) {
  return (
    <div className='registeredCourses'>
      <h1>Registered Courses</h1>
      <select className='studentRegisteredMenu' value={selectedStudentRegistered} onChange={handleStudentRegistered}>
        <option value="">Select Student to View Registered Courses</option>
        {students.map((student) => (
          <option key={student._id} value={student.studentID}>
            {student.name}
          </option>
        ))}
      </select>
      <table className='studentRegisteredTable'>
        <thead>{renderRegisteredTableColumns()}</thead>
        <tbody>{renderRegisteredCourses()}</tbody>
      </table>
    </div>
  );
}

export default RegisteredStudentInformation;
