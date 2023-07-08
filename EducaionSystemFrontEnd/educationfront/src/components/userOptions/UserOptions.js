import React from "react";
import "./UserOptions.css";
import { Link } from "react-router-dom";

const UserOptions = () => {
  return (
    <div className="userOptions">
      <div className="userOptions-wrapper">
        <Link to="/userCourses"  className="userOptionslink">
          <div class="userOptions-options ourCourses">OUR COURSES</div>
        </Link>

        <Link to="/myCourses" className="userOptionslink">
          <div class="userOptions-options myCourses">MY COURSES</div>
        </Link>
        <div class="userOptions-options library"> #####</div>
        <div class="userOptions-options x"> ####</div>
      </div>
    </div>
  );
};

export default UserOptions;
