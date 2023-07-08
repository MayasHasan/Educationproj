import React,{useEffect, useState} from 'react';
import "./OurCoureseSection.css";
import defualtImage from "./../../assets/defualtImage.png";
import CourseModal from '../courseModal/CourseModal';


const OurCoureseSection = (props) => {
const [courseModal,SetCourseModal]=useState(false)
const[courseId , setCourseId]=useState(false)
const handelCourseDetailsModal = (id)=>{
  SetCourseModal(true)
  setCourseId(id)
}

  const ourCourses= props.courses.map((course=>{
 const image =course.files.map((img => {
   return  img.filePath }
  ))
  return(
    <div className='ourCourse-box'>
                <div className='ourCourse-image' onClick={()=>handelCourseDetailsModal(course.courseId)}>
                    <img src={image.length !==0 ? image : defualtImage }
                     alt=''/>
                    </div>
                    <p>{course.title}</p>
                    <p>Price:  {course.fullPrice}  $</p>
                    
                </div> 
  )
}
  ))
    return (
        <div className='ourCoursesSection'>
            <div className='ourCoursesSection-container'>
           {ourCourses}
            </div>
         
  {courseModal&&<CourseModal SetCourseModal={SetCourseModal} courseId={courseId}/>}
        </div>
    );
}

export default OurCoureseSection;
