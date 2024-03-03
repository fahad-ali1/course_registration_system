import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import CourseInformation from './components/courseInformation/CourseInformation';
import RegisteredStudentInformation from './components/registerdStudents/RegisteredStudentInformation';

function App() {
  const apiUrl = 'https://course-register-be.onrender.com';

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedStudentRegistered, setSelectedStudentRegisteredView] = useState('');
  const [selectedStudentRegister, setSelectedStudentRegisterView] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(''); 

  // Function to fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsResponse = await axios.get(`${apiUrl}/students`);
        const coursesResponse = await axios.get(`${apiUrl}/courses`);
        setStudents(studentsResponse.data);
        setCourses(coursesResponse.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [apiUrl]);

  // Handler for selecting registered student
  const handleStudentRegistered = (event) => {
    setSelectedStudentRegisteredView(event.target.value);
  };

  // Handler for selecting student to register
  const handleStudentRegister = (event) => {
    setSelectedStudentRegisterView(event.target.value);
  };

  // Function to display success message
  const setSuccessMessage = (message, duration = 3000) => {
    setSuccess(message);
    setTimeout(() => {
      setSuccess('');
    }, duration);
  };

  // Function to handle course enrollment
  const handleEnrollButton = async (courseID) => {
    const selectedStudentID = parseInt(selectedStudentRegister);

    if (selectedStudentRegister === '') {
      setError("Please select a student first");
      window.scrollTo(0, 0);
    } else {
      setError('');

      try {
        await axios.post(`${apiUrl}/students/${selectedStudentID}/courses/${courseID}/enroll`);

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
  };

  // Function to handle course unenrollment
  const handleUnenrollButton = async (courseID) => {
    const selectedStudentID = parseInt(selectedStudentRegistered);

    if (selectedStudentRegistered === '') {
      setError("Please select a student first");
    } else {
      setError('');

      try {
        await axios.post(`${apiUrl}/students/${selectedStudentID}/courses/${courseID}/unenroll`);

        const updatedStudentsResponse = await axios.get(`${apiUrl}/students`);
        const updatedCoursesResponse = await axios.get(`${apiUrl}/courses`);
        setStudents(updatedStudentsResponse.data);
        setCourses(updatedCoursesResponse.data);
        setSuccessMessage("Successfully unenrolled!", 5000);
      } catch (error) {
        setError("Error unenrolling from class: " + error.response.data);
        window.scrollTo(0, 0);
      }
    }
  };

  // Function to render courses available for enrollment
  const renderCourses = () => {
    const selectedStudentID = parseInt(selectedStudentRegister);
    const student = students.find((student) => student.studentID === selectedStudentID);
    if (!student) return '';

    return courses.map((course) => {
      const isEnrolled = student.registeredCourses.includes(course.courseID);

      return (
        <tr key={course.courseID}>
          <td>{course.courseID}</td>
          <td>{course.courseName}</td>
          <td>{course.department}</td>
          <td>{course.timeOfDay}</td>
          <td>
            {isEnrolled ? (
              <button className='enrolled' disabled>
                Enrolled
              </button>
            ) : (
              <button className='enroll' onClick={() => handleEnrollButton(course.courseID)}>
                Enroll
              </button>
            )}
          </td>
        </tr>
      );
    });
  };

  // Function to render courses already taken by a student
  const renderRegisteredCourses = () => {
    const selectedStudentID = parseInt(selectedStudentRegistered);
    const student = students.find((student) => student.studentID === selectedStudentID);
    if (!student) return '';

    return student.registeredCourses.map((courseID) => {
      const course = courses.find((course) => course.courseID === courseID);
      return (
        <tr key={courseID}>
          <td>{student.studentID}</td>
          <td>{courseID}</td>
          <td>{course.courseName}</td>
          <td>{course.department}</td>
          <td>{course.timeOfDay}</td>
          <td>
            <button className='unenroll' onClick={() => handleUnenrollButton(course.courseID)}>
              Drop
            </button>
          </td>
        </tr>
      );
    });
  };

  // Function to render columns for courses available for enrollment
  const renderRegisterTableColumns = () => {
    if (selectedStudentRegister === '') return null; 
  
    return (
      <tr>
        <th>Course ID</th>
        <th>Course Name</th>
        <th>Department</th>
        <th>Time of Day</th>
        <th>Enroll</th>
      </tr>
    );
  };

  // Function to render columns for registered courses
  const renderRegisteredTableColumns = () => {
    if (selectedStudentRegistered === '') return null; 
    return (
      <tr>
        <th>Student ID</th>
        <th>Course ID</th>
        <th>Course Name</th>
        <th>Department</th>
        <th>Time of Day</th>
        <th>Drop</th>
      </tr>
    );
  };

  return (
    <div className="page-container">
      <div className="page-content">
        {loading && <div className="loading">Fetching data... May take up to 60 seconds</div>}
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        {currentPage === '' && (
          <div className="welcome-section">
            <h2>Welcome to Fahad's Course Registration System!</h2>
            <p>This system allows you to enroll in courses connected to a MongoDB database!</p>
            <h4>To get started, click one of the navigation buttons below.</h4>
          </div>
          )}
        <div className="page-buttons">
          <button 
            onClick={() => setCurrentPage('course')} 
            className={currentPage === 'course' ? 'active' : ''}
          >
            Course Information
          </button>
          <button 
            onClick={() => setCurrentPage('student')} 
            className={currentPage === 'student' ? 'active' : ''}
          >
            Registered Students
          </button>
        </div>
        {currentPage === 'course' && (
          <CourseInformation
            students={students}
            selectedStudentRegister={selectedStudentRegister}
            handleStudentRegister={handleStudentRegister}
            renderRegisterTableColumns={renderRegisterTableColumns}
            renderCourses={renderCourses}
          />
        )}
        {currentPage === 'student' && (
          <RegisteredStudentInformation
            students={students}
            selectedStudentRegistered={selectedStudentRegistered}
            handleStudentRegistered={handleStudentRegistered}
            renderRegisteredTableColumns={renderRegisteredTableColumns}
            renderRegisteredCourses={renderRegisteredCourses}
          />
        )}
      </div>
      <footer className="footer">
        <p>Site made by Fahad © {new Date().getFullYear()}</p>
      </footer>
    </div>  
  );  
}

export default App;