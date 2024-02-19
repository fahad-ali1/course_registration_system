import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // Local host development
  // const apiUrl = 'http://localhost:8000';
  const dbNAME = process.env.REACT_APP_dbNAME
  const dbPASSWORD = process.env.REACT_APP_dbPASSWORD
  const dbCLUSTER = process.env.REACT_APP_dbCLUSTER
  const dataBase = process.env.REACT_APP_dataBase;
  const apiUrl = `mongodb+srv://${dbNAME}:${dbPASSWORD}@${dbCLUSTER}/${dataBase}`;

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedStudentRegistered, setSelectedStudentRegisteredView] = useState('1');
  const [selectedStudentRegister, setSelectedStudentRegisterView] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  /**
   *  Fetch student and courses dataset
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsResponse = await axios.get(`${apiUrl}/students`);
        const coursesResponse = await axios.get(`${apiUrl}/courses`);
        setStudents(studentsResponse.data);
        setCourses(coursesResponse.data);
      } catch (error) {
        setError(error)
      }
    };
    fetchData();
  }, [apiUrl]);

  /**
   *  Handles drop down menu for registered student info 
   */
  const handleStudentRegistered = (event) => {
    setSelectedStudentRegisteredView(event.target.value);
  };

  /**
   *  Handles drop down menu for registering a student  
   */
  const handleStudentRegister = (event) => {
    setSelectedStudentRegisterView(event.target.value);
  };

  // Display green successs message 
  const setSuccessMessage = (message, duration = 3000) => {
    setSuccess(message);
  
    setTimeout(() => {
      setSuccess('');
    }, duration);
  };

  /**
   *  Render the drop down menu to choose student
   */
  const renderStudentSelectDropDown = () => {
    return students.map((student) => (
      <option key={student._id} value={student.studentID}>
        {student.name}
      </option>
    ));
  };

  /**
   *  Handles enrolling to given course ID when student selected
   */
  const handleEnrollButton = async (courseID) => {
    const selectedStudentID = parseInt(selectedStudentRegister);

    // Error check to make sure student is selected
    if (selectedStudentRegister === '') {
      setError("Please select a student first");
      window.scrollTo(0, 0);
    }else{setError('') // Remove error 

      // Update database with enroll
      try {
        await axios.post(`${apiUrl}/students/${selectedStudentID}/courses/${courseID}/enroll`);

        // Update the state after enrollment for live table feedback
        const updatedStudentsResponse = await axios.get(`${apiUrl}/students`);
        const updatedCoursesResponse = await axios.get(`${apiUrl}/courses`);
        setStudents(updatedStudentsResponse.data);
        setCourses(updatedCoursesResponse.data);
        setSuccessMessage("Successfully enrolled!", 5000);
      } catch (error) {
          setError("Error enrolling student: " + error.response.data);
          window.scrollTo(0, 0);
      }
    }
  } 

  /**
   *  Handles unenrolling to given course ID when student selected
   */
  const handleUnenrollButton = async (courseID) => {
    const selectedStudentID = parseInt(selectedStudentRegistered);

    if (selectedStudentRegistered === '') {
      setError("Please select a student first");
    }else{setError('')

      // Update database with unenroll
      try {
        await axios.post(`${apiUrl}/students/${selectedStudentID}/courses/${courseID}/unenroll`);
        
        // Update the state after unenrollment for live table view
        const updatedStudentsResponse = await axios.get(`${apiUrl}/students`);
        const updatedCoursesResponse = await axios.get(`${apiUrl}/courses`);
        setStudents(updatedStudentsResponse.data);
        setCourses(updatedCoursesResponse.data);
        setSuccessMessage("Successfully unenrolled!", 5000);
      } catch (error) {
          setError("Error unenrolling student: " + error.response.data);
          window.scrollTo(0, 0);
      }
    }
  }

  /**
   *  Render courses that are able to be unerolled in by a student
   */
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

  /**
   *  Render courses that are already taken by selected student
   */
  const renderRegisteredCourses = () => {
    const selectedStudentID = parseInt(selectedStudentRegistered);
    const student = students.find((student) => student.studentID === selectedStudentID);
    if (!student) return ''; // if no student selected

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

  /**
   *  Render courses columns
   */
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

  /**
   *  Render courses columns with student ID
   */
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
      {/************ Course Info Table ************/}
      <div className='registerCourse'>
        <h1>Course Information</h1>
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

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      {/************ Student Info Table *************/}
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

      {/************ Footer *************/}
      <footer className='footer'>
        <p>Site made by Fahad © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );  
}

export default App;