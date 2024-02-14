import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="App">
      <h1>Courses</h1>
      <ul>
        {courses.map((course, index) => (
          <li key={index}>
            <strong>Course Name:</strong> {course.courseName}, <strong>Department:</strong> {course.department}, <strong>Time of Day:</strong> {course.timeOfDay}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
