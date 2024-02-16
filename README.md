## Course Registration System

A web application for managing course registrations. This application allows students to view available courses, register for classes, drop registered classes, and view their registered courses.

### Author
Fahad

### Features

- View all available courses.
- Register for classes.
- Drop registered classes.
- View registered courses.

### Technologies Used

- **Backend:**
  - JavaScript/Node.js
  - MongoDB for database
- **Frontend:**
  - React.js

### Screenshots
<img width="600" alt="Screenshot 2024-02-15 at 7 15 19 PM" src="https://github.com/fahad-ali1/course_registration_system/assets/97869609/7413f0c5-0b67-4ecb-a41f-8411a48a58b1">
<img width="600" alt="Screenshot 2024-02-15 at 7 15 50 PM" src="https://github.com/fahad-ali1/course_registration_system/assets/97869609/df475b67-64f1-43ec-813d-8e3cd74710c8">
<img width="600" alt="Screenshot 2024-02-15 at 7 15 41 PM" src="https://github.com/fahad-ali1/course_registration_system/assets/97869609/7aed55fb-f5f4-4ab8-b2c5-881f62b793b5">

#### URLs

- `/courses/`: Get all available courses.
- `courses/:courseID`: Get a single course.

- `/students/:studentID/courses/:courseID/enroll`: Enroll in a given course.
- `/students/:studentID/courses/:courseID/unenroll`: Unenroll in a given course.
- `/:studentID/courses'`: Select registered courses for given student.
  
- `/students`: Get all students.
- `/students/:studentID`: Get a single student.

#### Models

- Student:
  - studentID
  - name
  - email
  - registeredCourses
- Course:
  - courseID
  - courseName
  - department
  - timeOfDay
  - 

### Installing the back-end
Install dependencies
```bash
cd be
npm install
```

Set up the database
```bash
mongosh
use course_register
db.createCollection("students")
db.createCollection("courses")
```

Json files located in home directory
```bash
var studentsArray = JSON.parse(json_documents/students.json)
var coursesArray = JSON.parse(json_documents/courses.json)
```

Insert the json objects
```bash
db.students.insertMany(studentsArray)
db.students.insertMany(coursesArray)
```

### Installing the front-end
```bash
cd fe
npm install
npm start
```
