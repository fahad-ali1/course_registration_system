import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedStudentRegistered, setSelectedStudentRegisteredView] = useState('1');
  const [selectedStudentRegister, setSelectedStudentRegisterView] = useState('');
  const [error, setError] = useState('');

  // Fetch students and courses from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsResponse = await axios.get('http://localhost:8000/students');
        const coursesResponse = await axios.get('http://localhost:8000/courses');
        setStudents(studentsResponse.data);
        setCourses(coursesResponse.data);
      } catch (error) {
        setError(error)
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

  const handleEnrollButton = async (courseID) => {
    const selectedStudentID = parseInt(selectedStudentRegister);

    if (selectedStudentRegister === '') {
      setError("Please select a student first");
      window.scrollTo(0, 0);
      
    }else{setError('')

      try {
        await axios.post(`http://localhost:8000/students/${selectedStudentID}/courses/${courseID}/enroll`);

        // Update the state after enrollment
        const updatedStudentsResponse = await axios.get('http://localhost:8000/students');
        const updatedCoursesResponse = await axios.get('http://localhost:8000/courses');
        setStudents(updatedStudentsResponse.data);
        setCourses(updatedCoursesResponse.data);
      } catch (error) {
          setError("Error enrolling student: " + error.response.data);
          window.scrollTo(0, 0);
      }
    }
  } 

  const handleUnenrollButton = async (courseID) => {
    const selectedStudentID = parseInt(selectedStudentRegistered);

    if (selectedStudentRegistered === '') {
      setError("Please select a student first");
      window.scrollTo(0, 0);

    }else{setError('')

      try {
        
        await axios.post(`http://localhost:8000/students/${selectedStudentID}/courses/${courseID}/unenroll`);
        
        // Update the state after unenrollment
        const updatedStudentsResponse = await axios.get('http://localhost:8000/students');
        const updatedCoursesResponse = await axios.get('http://localhost:8000/courses');
        setStudents(updatedStudentsResponse.data);
        setCourses(updatedCoursesResponse.data);

      } catch (error) {
          setError("Error unenrolling student: " + error.response.data);
          window.scrollTo(0, 0);
      }
    }
  }

  const renderCourses = () => {
    return courses.map((course) => (
      <tr key={course.courseID}>
        <td>{course.courseID}</td>
        <td>{course.courseName}</td>
        <td>{course.department}</td>
        <td>{course.timeOfDay}</td>
        <td>
          <button className='enroll' onClick={() => handleEnrollButton(course.courseID)}>
          Enroll</button>
          </td>
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
          <td><button className='unenroll' onClick={() => handleUnenrollButton(course.courseID)}>
            Unenroll</button>
            </td>
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
    <div>
      {/* Course Info Table */}
      <div className='registerCourse'>
        <h1>Course Information</h1>
        {error && <div className="error">{error}</div>}
        <select className='studentRegisterMenu' value={selectedStudentRegister} onChange={handleStudentRegister}>
          <option value="">Select Student to Enroll</option>
          {renderStudentSelectDropDown()}
        </select>
          <table className='courseRegisterTable'>
            <thead>
              {renderRegisterTableColumns()}
            </thead>
            <tbody>
              {renderCourses()}
            </tbody>
          </table>
      </div>
  
      {/* Student Info Table */}
      <div className='registeredCourses'>
        <h1>Registered Student Information</h1>
        <select className='studentRegisteredMenu' value={selectedStudentRegistered} onChange={handleStudentRegistered}>
          <option value="">Select to View Registered Courses</option>
          {renderStudentSelectDropDown()}
        </select>
  
          <table className='studentRegisteredTable'>
            <thead>
              {renderRegisteredTableColumns()}
            </thead>
            <tbody>
              {renderRegisteredCourses()}
            </tbody>
          </table>
      </div>
    </div>
  );  
}

export default App;