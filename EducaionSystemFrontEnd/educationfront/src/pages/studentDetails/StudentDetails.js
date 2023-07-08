import React, { useEffect } from "react";
import "./StudentDetails.css";

import { getStudentDetails, reset } from "../../api/students/studentSlice";
import { useSelector, useDispatch } from "react-redux";

import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const dispatch = useDispatch();
  const { studentId } = useParams();
  const { student } = useSelector((state) => state.student);
  useEffect(() => {
    dispatch(reset());
    dispatch(getStudentDetails(studentId));
  }, [dispatch]);

  if (student.courses.length > 0) {
    var courses = student.courses.map((course) => <ol> {course.title} </ol>);
  }

  return (
    <div className="studentDetails">
      <div className="studentDetails-content">
        <div>
          {" "}
          <h2 className="studentDetails-Title">
            {student.firstName} {student.lastName}{" "}
          </h2>{" "}
        </div>

        <div className="studentInfo">
          <p>
            <span>User Name :</span>
            {student.userName}
          </p>
          <p>
            <span>Email :</span>
            {student.email}
          </p>
          <p>
            <span>Address :</span>
            {student.address}
          </p>
          <p>
            <span>Phone :</span>
            {student.phone}
          </p>
          <p>
            <span>JoinedDate :</span>
            {student.joinedDate}
          </p>
          <p>
            <span>Courses :</span> <ul>{courses}</ul>{" "}
          </p>
          <button type="button" className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
      <div className="studentPhoto"></div>
    </div>
  );
};

export default StudentDetails;
