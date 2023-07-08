import React from 'react';
import './CourseInformation.css'
import defualtImage from "./../../assets/defualtImage.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const CourseInformation = () => {
    const navigate = useNavigate();
    const { course ,courseImage, isLoading} = useSelector((state) => state.course);

 const handleNext =()=>{
  navigate(`/coursedetails/courseStudents/${course.courseId}`)
      
  }
   return (
        <div className='courseInformation'>
            <div className='courseInformation-left'>
            <p ><span>Description :</span>{course.description}</p>         
            <p><span>Level :</span>{course.level}</p>
            <p><span>Start Date :</span>{course.startDate}</p>
            <p><span>End Date :</span>{course.endDate}</p>
            <p><span>Price :</span>{course.fullPrice}</p>
            <p><span>Teacher :</span>{JSON.stringify(course.teacher) !== '{}' ?"There is no teacher for this course" : `${course.teacher.firstName} ${course.teacher.lastName}` }</p>
            </div>
            <div className='courseInformation-right'>
       
            <div className='courseCard'>
                <div className='courseCard-image'>
                    <img  src={courseImage==="http://localhost:5000/"  ? defualtImage : courseImage} alt=''/>
                    </div>
                    <p> {course.title}</p>
                    <p>Price :{course.fullPrice}</p> 
                </div> 
                <div className="courseInformation-btn">
                <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/courses")}
              >
                Cancel
              </button>
              <button
                type="button"
                className="next-btn"
                onClick={handleNext}
              >
                Next
              </button>
              </div>
            </div>
        </div>
    );
}

export default CourseInformation;

