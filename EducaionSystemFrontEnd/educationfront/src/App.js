import "./App.css";
import LandPage from "./pages/landPage/LandPage";
import DashBoard from "./pages/dashBoard/DashBoard";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateCourse from "./pages/createCourses/CreateCourse";
import AdminCourses from "./pages/admin_Courses/AdminCourses";
import AddCourseInformation from "./components/addCourseInformation/AddCourseInformation";
import AddCourseImage from "./components/addCourseImage/AddCourseImage";
import AddCourseTeachre from "./components/addCourseTeachre/AddCourseTeachre";
import React from "react";
import AdminTeachers from "./pages/admin-Teachers/AdminTeachers";
import AddTeacher from "./pages/addTeacher/AddTeacher";
import EditCourse from "./pages/editCourse/EditCourse";
import CourseDetails from "./pages/courseDetails/CourseDetails";
import AddSessionFile from "./components/addSessionFile/AddSessionFile";
import AdminSessions from "./pages/admin-Sessions/AdminSessions";
import AdminStudents from "./pages/admin-Students/AdminStudents";
import TeacherDetails from "./pages/teacherDetails/TeacherDetails";
import SessionDetails from "./pages/sessionDetails/SessionDetails";
import StudentDetails from "./pages/studentDetails/StudentDetails";
import CourseInformation from "./components/courseInformation/CourseInformation";
import CourseStudents from "./components/courseStudents/CourseStudents";
import CourseSessions from "./components/courseSessions/CourseSessions";
import StudentDashBoard from "./pages/dashBoard/StudentDashBoard";
import UserCourses from "./pages/userCourses/UserCourses";
import UserOptions from "./components/userOptions/UserOptions";
import MyCourses from "./pages/myCourses/MyCourses";
import PrivateRoute from "./api/auth/PrivateRoute";
import NavbarLayout from "./components/navbarLayout/NavbarLayout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandPage />} />
        <Route element={<NavbarLayout />}>
          <Route element={<DashBoard />}>
            <Route path="/courses" element={<PrivateRoute />}>
              <Route path="/courses" element={<AdminCourses />} />
            </Route>
            <Route path="/sessions" element={<PrivateRoute />}>
              <Route path="/sessions" element={<AdminSessions />} />
            </Route>
            <Route element={<CreateCourse />}>
              <Route
                path="/createcourse/addcourseinformation"
                element={<PrivateRoute />}
              >
                <Route
                  path="/createcourse/addcourseinformation"
                  element={<AddCourseInformation />}
                />{" "}
              </Route>
              <Route
                path="/createcourse/addcourseimage"
                element={<PrivateRoute />}
              >
                <Route
                  path="/createcourse/addcourseimage"
                  element={<AddCourseImage />}
                />
              </Route>
              <Route
                path="/createcourse/addcourseteachre"
                element={<PrivateRoute />}
              >
                <Route
                  path="/createcourse/addcourseteachre"
                  element={<AddCourseTeachre />}
                />
              </Route>
            </Route>
            <Route
              path="/createsession/addsessionfiles/course/:courseId/session/:sessionId"
              element={<PrivateRoute />}
            >
              <Route
                path="/createsession/addsessionfiles/course/:courseId/session/:sessionId"
                element={<AddSessionFile />}
              />
            </Route>
            <Route element={<CourseDetails />}>
              <Route path="/coursedetails/:courseId" element={<PrivateRoute />}>
                <Route
                  path="/coursedetails/:courseId"
                  element={<CourseInformation />}
                />{" "}
              </Route>
              <Route
                path="/coursedetails/courseStudents/:courseId"
                element={<PrivateRoute />}
              >
                <Route
                  path="/coursedetails/courseStudents/:courseId"
                  element={<CourseStudents />}
                />
              </Route>
              <Route
                path="/coursedetails/courseSessions/:courseId"
                element={<PrivateRoute />}
              >
                <Route
                  path="/coursedetails/courseSessions/:courseId"
                  element={<CourseSessions />}
                />
              </Route>
            </Route>
            <Route path="/teachers" element={<PrivateRoute />}>
              <Route path="/teachers" element={<AdminTeachers />} />{" "}
            </Route>
            <Route path="/addteacher" element={<PrivateRoute />}>
              <Route path="/addteacher" element={<AddTeacher />} />
            </Route>
            <Route path="/teacherDetails/:teacherId" element={<PrivateRoute />}>
              <Route
                path="/teacherDetails/:teacherId"
                element={<TeacherDetails />}
              />
            </Route>
            <Route path="/students" element={<PrivateRoute />}>
              <Route path="/students" element={<AdminStudents />} />{" "}
            </Route>
            <Route path="/editcourse/:courseId" element={<PrivateRoute />}>
              <Route path="/editcourse/:courseId" element={<EditCourse />} />
            </Route>
            <Route path="/sessionDetails/:sessionId" element={<PrivateRoute />}>
              <Route
                path="/sessionDetails/:sessionId"
                element={<SessionDetails />}
              />
            </Route>
            <Route path="/studentDetails/:studentId" element={<PrivateRoute />}>
              <Route
                path="/studentDetails/:studentId"
                element={<StudentDetails />}
              />
            </Route>
          </Route>
     
          <Route path="/createcourse/addcourseimage" element={<PrivateRoute />}>
            <Route
              path="/createcourse/addcourseimage"
              element={<AddCourseImage />}
            />
          </Route>
          <Route element={<StudentDashBoard />}>
            <Route path="/StudentDashBoard" element={<PrivateRoute />}>
              <Route path="/StudentDashBoard" element={<UserOptions />} />
            </Route>
            <Route path="/userCourses" element={<PrivateRoute />}>
              <Route path="/userCourses" element={<UserCourses />} />
            </Route>
            <Route path="/myCourses" element={<PrivateRoute />}>
              <Route path="/myCourses" element={<MyCourses />} />
            </Route>
            <Route
              path="/myCourses/coursedetails/courseSessions/:courseId"
              element={<PrivateRoute />}
            >
              <Route
                path="/myCourses/coursedetails/courseSessions/:courseId"
                element={<CourseSessions />}
              />
            </Route>
            <Route path="/myCourses/sessionDetails/:sessionId" element={<PrivateRoute />}>
              <Route
                path="/myCourses/sessionDetails/:sessionId"
                element={<SessionDetails />}
              />
            </Route>
          </Route>
        </Route>

      </Routes>
      <ToastContainer />

    </div>
  );
}

export default App;
