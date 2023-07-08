import React from "react";
import "./CreateCourse.css";

import { NavLink, Outlet } from "react-router-dom";

const CreateCourse = () => {
  const mystyle = ({ isActive }) => {
    return {
      fontWeight: isActive ? "900" : "normal",
      color: isActive ? "orange" : "white",
      textDecoration: "none",
      fontSize: " 15px",
      borderBottom: isActive ? "2px solid  orange" : "none",
      pointerEvents: "none",
    };
  };

  return (
    <div className="createCoure">
      <div className="createCoure-header">
        <h2 className="createCouresTitle">Create new course</h2>
        <ul>
          <NavLink to="/createcourse/addcourseinformation" style={mystyle}>
            <li className="step ">COURSE INFORMATION</li>
          </NavLink>
          <NavLink to="/createcourse/addcourseimage" style={mystyle}>
            <li className="step ">COURSE IMAGE</li>
          </NavLink>
          <NavLink to="/coursedetails/courseSessions" style={mystyle}>
            <li className="step ">COURSE TEACHER</li>
          </NavLink>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default CreateCourse;
