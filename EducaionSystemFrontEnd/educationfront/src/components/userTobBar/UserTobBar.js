import React from 'react';
import './UserTobBar.css'
import { Formik, Form } from "formik";
import { getCourses,deleteCourse , reset,resetImage } from "../../api/courses/courseSlice";
import { useSelector, useDispatch } from "react-redux";
import FormikField from './../formik/FormikField';
import { useNavigate } from 'react-router-dom';

const UserTobBar = (props) => {
    const dispatch = useDispatch();
const navigate = useNavigate()
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
    if ( (/userCourses/.test(window.location.href))) {
      
      dispatch(getCourses(values));
    }
    else
    props.setTitle(values.title)
    props.getDataBySearch(values.title)
 
 };
    return (
        <>
      <div className='userTobBar'>
          
             <button type="button" className="userTobBar-btn" onClick={()=>navigate(-1)}>
              Back
            </button>
           
           
              <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        
      >
        <Form  className= 'userCoursesform' >
          <div className="userCourses-search">
            <FormikField
              name="title"
              type="text"
              placeholder="Search by Course name"
             
            />   
                </div>
                <button type="submit" className="userCourses-btn">
              Search
            </button>
                </Form>
                </Formik>
              
       
        <button type="button" className="userTobBar-btn" onClick={()=>navigate("/StudentDashBoard")}>
              Home
            </button>
          </div>
          <hr/>
         </>
    );
}

export default UserTobBar;
