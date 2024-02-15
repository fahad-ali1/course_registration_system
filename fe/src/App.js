import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedStudentRegistered, setSelectedStudentRegisteredView] = useState('');
  const [selectedStudentRegister, setSelectedStudentRegisterView] = useState('');

  // Fetch students and courses from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsResponse = await axios.get('http://localhost:8000/students');
        const coursesResponse = await axios.get('http://localhost:8000/courses');
        setStudents(studentsResponse.data);
        setCourses(coursesResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleStudentRegistered = (event) => {
    setSelectedStudentRegisteredView(event.target.value);
  };

  const handleStudentRegister = (event) => {
    setSelectedStudentRegisterView(event.target.value);
  };

  const renderStudentSelectDropDown = () => {
    return students.map((student) => (
      <option key={student._id} value={student.studentID}>
        {student.name}
      </option>
    ));
  };

  const renderCourses = () => {
    return courses.map((course) => (
      <tr key={course.courseID}>
        <td>{course.courseID}</td>
        <td>{course.courseName}</td>
        <td>{course.department}</td>
        <td>{course.timeOfDay}</td>
        <td><button className='enroll'>Enroll</button></td>
      </tr>
    ));
  }

  const renderRegisteredCourses = () => {
    const selectedStudentID = parseInt(selectedStudentRegistered);
    const student = students.find((student) => student.studentID === selectedStudentID);
    if (!student) return null;

    return student.registeredCourses.map((courseID) => {
      const course = courses.find((course) => course.courseID === courseID);
      return (
        <tr key={courseID}>
          <td>{student.studentID}</td>
          <td>{courseID}</td>
          <td>{course.courseName}</td>
          <td>{course.department}</td>
          <td>{course.timeOfDay}</td>
          <td><button className='unenroll'>Unenroll</button></td>
        </tr>
      );
    });
  };

  const renderRegisterTableColumns = () => {
    return (
      <tr>
        <th>Course ID</th>
        <th>Course Name</th>
        <th>Department</th>
        <th>Time of Day</th>
        <th>Unenroll</th>
      </tr>
    );
  };  

  const renderRegisteredTableColumns = () => {
    return (
      <tr>
        <th>Student ID</th>
        <th>Course ID</th>
        <th>Course Name</th>
        <th>Department</th>
        <th>Time of Day</th>
        <th>Unenroll</th>
      </tr>
    );
  };  

  return (
    <div className="homePage">

      {/* Course Info Table */}
      <h1>Course Information</h1>

      <select className='studentRegisterMenu' value={selectedStudentRegister} onChange={handleStudentRegister}>
        <option value="">Select Student to Enroll</option>
        {renderStudentSelectDropDown()}
      </select>

      {selectedStudentRegister && (
        <table className='course'>
          <thead>
            {renderRegisterTableColumns()}
          </thead>
          <tbody>
            {renderCourses()}
          </tbody>
        </table>
      )}

      {/* Student Info Table */}

      <h1>Registered Student Information</h1>

      <select className='studentRegisteredMenu' value={selectedStudentRegistered} onChange={handleStudentRegistered}>
        <option value="">Select to View Registered Courses</option>
        {renderStudentSelectDropDown()}
      </select>

      {selectedStudentRegistered && (
        <table className='student'>
          <thead>
            {renderRegisteredTableColumns()}
          </thead>
          <tbody>
            {renderRegisteredCourses()}
          </tbody>
        </table>
      )}
    </div>
  )
};

export default App;