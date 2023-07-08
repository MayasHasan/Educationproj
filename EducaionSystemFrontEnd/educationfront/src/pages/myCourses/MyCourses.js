import React, { useState,useEffect } from "react";
import "./MyCourses.css";
import { useSelector } from "react-redux";
import OurCoureseSection from "./../../components/ourCoursesSection/OurCoureseSection";
import UserTobBar from "./../../components/userTobBar/UserTobBar";

const MyCourses = () => {
  const { student } = useSelector(
    (state) => state.student
  );  const [userCourses, setUserCourses] = useState([]);


  const [title, setTitle] = useState();


  const getDataBySearch = () => {
    setUserCourses(student.courses.filter((x) => x.title === title));
  };
useEffect(() => {
    getDataBySearch()
}, [title]);

  return (
    <div className="userCourses">
      <UserTobBar getDataBySearch={getDataBySearch} setTitle={setTitle} />
      <div>
        <OurCoureseSection courses={userCourses.length !==0 ? userCourses : student.courses}  />
      </div>
    </div>
  );
};

export default MyCourses;
