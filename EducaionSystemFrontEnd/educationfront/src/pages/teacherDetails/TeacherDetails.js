import React, { useEffect } from "react";
import "./TeacherDetails.css";
import { getTeacherById, reset } from "../../api/teachers/teacherSlice";
import { useSelector, useDispatch } from "react-redux";

import { useParams } from "react-router-dom";
const TeacherDetails = () => {
  const dispatch = useDispatch();
  const { teacherId } = useParams();
  const { teacher } = useSelector((state) => state.teacher);

  useEffect(() => {
    dispatch(reset());
    dispatch(getTeacherById(teacherId));
  }, [dispatch]);

  if (teacher.courses.length > 0) {
    var courses = teacher.courses.map((course) => <ol> {course.title} </ol>);
  }

  return (
    <div className="teacherDetails">
      <div className="teacherDetails-content">
        <div>
          {" "}
          <h2 className="teacherModal-Title">
            {teacher.firstName} {teacher.lastName}{" "}
          </h2>{" "}
        </div>

        <div className="teacherInfo">
          <p>
            <span>Specialization :</span>
            {teacher.specialization}
          </p>
          <p>
            <span>Address :</span>
            {teacher.address}
          </p>
          <p>
            <span>Email :</span>
            {teacher.email}
          </p>
          <p>
            <span>Phone :</span>
            {teacher.phone}
          </p>
          <p>
            <span>Salary :</span>
            {teacher.salary}
          </p>
          <p>
            <span>JoinedDate :</span>
            {teacher.joinedDate}
          </p>
          <p>
            <span>Notes :</span>
            {teacher.notes}
          </p>
          <p>
            <span>Courses :</span> <ul>{courses}</ul>{" "}
          </p>
          <button type="button" className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
      <div className="teacherPhoto"></div>
    </div>
  );
};

export default TeacherDetails;
