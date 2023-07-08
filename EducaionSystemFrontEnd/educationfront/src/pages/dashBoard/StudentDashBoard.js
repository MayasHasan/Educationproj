import React,{useEffect} from 'react';
import './StudentDashBoard.css'
import { Link, Outlet } from 'react-router-dom';

import { useSelector, useDispatch } from "react-redux";
import {getStudentDetails } from "../../api/students/studentSlice";

const StudentDashBoard = () => {
    const { user} = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStudentDetails(user.userId));
      }, [dispatch]);
      
    return (
        <div className='studentDashBoard'>
         <div className='studentDashBoard-container'>
           <Outlet/>
        </div></div>
    );
}

export default StudentDashBoard;
