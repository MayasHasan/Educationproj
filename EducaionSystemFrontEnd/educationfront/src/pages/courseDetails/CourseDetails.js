import React,{useState,useEffect} from 'react';
import './CourseDetails.css'
import CourseInformation from '../../components/courseInformation/CourseInformation';
import {useParams} from "react-router-dom";
import CourseStudents from '../../components/courseStudents/CourseStudents';
import CourseSessions from '../../components/courseSessions/CourseSessions';
import { useSelector, useDispatch } from "react-redux";
import { getCourseProfileImg ,getcourse, reset } from "../../api/courses/courseSlice";
import { NavLink, Outlet } from "react-router-dom";

const CourseDetails = () => {
  const { course} = useSelector((state) => state.course);

let { courseId } = useParams();
const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset());
    dispatch(getcourse(courseId));
    dispatch(getCourseProfileImg(courseId))
  },[dispatch])


const mystyle = ({ isActive }) => {
  return {
    fontWeight: isActive ? "900" : "normal",
    color: isActive ? "orange" : "white",
    textDecoration: "none",
    fontSize: " 15px",
    borderBottom: isActive ? "2px solid  orange" : "none",
  };
};

    return (
        <div className="courseDetails">
      <div className="courseDetails-header">
        <h2 className="courseDetailsTitle">{course.title}</h2>
        <ul>

        <NavLink to={`/coursedetails/${courseId}`} style={mystyle}>
            <li className="step ">COURSE INFORMATION</li>
          </NavLink>
          <NavLink to={`/coursedetails/courseStudents/${courseId}`} style={mystyle}>
            <li className="step ">COURSE STUDENTS</li>
          </NavLink>
          <NavLink to={`/coursedetails/courseSessions/${courseId}`} style={mystyle}>
            <li className="step ">COURSE SESSIONS</li>
          </NavLink>
  
        </ul>
      </div>
<Outlet/>
    </div>
    );
}

export default CourseDetails;
