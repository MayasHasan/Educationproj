import React,{useState,useEffect} from 'react';
import './UserCourses.css'
import { getCourses,deleteCourse , reset,resetImage } from "../../api/courses/courseSlice";
import { Formik, Form } from "formik";

import { useSelector, useDispatch } from "react-redux";
import FormikField from './../../components/formik/FormikField';
import OurCoureseSection from '../../components/ourCoursesSection/OurCoureseSection';
import {getStudentDetails } from "../../api/students/studentSlice";
import UserTobBar from '../../components/userTobBar/UserTobBar';

const UserCourses = () => {
    const dispatch = useDispatch();
    const { student, isLoading, isSuccess, message, isError } = useSelector(
      (state) => state.student
      );
    const {courses } = useSelector(
      (state) => state.course
      );
      const initialValues = {
        title: "",
        price: "",
        level: "",
        startDate: "",
        endDate: "",
        pageNumber:1,
       pageSize:10000,
      };

  const onSubmit = (values) => {
    dispatch(getCourses(values));
 
 };

 const courseOption = courses.filter(
  (obj) => !student.courses.some(({ courseId }) => obj.courseId === courseId)
);



 useEffect(() => {
    dispatch(reset()); 
    dispatch(resetImage()); 
    dispatch(getCourses(initialValues));
  }, [dispatch,isSuccess]);
  
    return (
        <div className='userCourses'>
         
         <UserTobBar/>
              
                <div>
                    <OurCoureseSection courses={courseOption}/>
                </div>
                </div>

    
    );
}

export default UserCourses;
