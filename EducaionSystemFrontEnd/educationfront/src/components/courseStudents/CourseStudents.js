import React from 'react';
import './CourseStudents.css';

import { removeStudentFromCourse, reset } from "../../api/courses/courseSlice";

import { useNavigate} from "react-router-dom";
import DataTableComponent from '../dataTable/DataTableComponent';
import { useSelector, useDispatch } from "react-redux";

const CourseStudents = () => {
  const { course ,courseImage, isLoading} = useSelector((state) => state.course);

  const navigate = useNavigate();
  const dispatch = useDispatch();
 
        var columns = [
            {
              name :"First Name",
              selector: row => row.firstName , 
              sortable:true,
           sortFiled:"First Name"
            },
            {
              name :"Last Name",
              selector: row => row.lastName,
              sortable:true,
              sortFiled:"lastName"
            },
            {
              name :"Address",
              selector: row => row.address,
              sortable:true,
              sortFiled:"address"
            },
            {
              name :"Email",
              selector: row => row.email,
              sortable:true,
              sortFiled:"email"
            },
        
            {
              name : "Action",
          cell : (row)=>(
           <>
          <button onClick={()=>removeItemFromCourse(course.courseId, row.studentId)}>Remove</button>         
          </>
         )
            }
          ];
          const removeItemFromCourse = (courseId,studentId) => { 
           const myData = {courseId:courseId,studentId:studentId}
          dispatch(reset())
         dispatch(removeStudentFromCourse(myData))
          console.log(myData)
            };
            const setItemToDelete = () => { 
           
            };
            const handlePrevious =()=>{
             navigate(`/coursedetails/${course.courseId}`)

              }
          
                const handleNext =()=>{
               navigate(`/coursedetails/courseSessions/${course.courseId}`)

                }
    return (
      <div className='courseStudents'>
              <div className="courseStudents-btn">
              <button
                type="button"
                className="cancel-btn"
                onClick={handlePrevious}
              >
                Previous
              </button>
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
    
        <div>
 <DataTableComponent columns={columns} selectableRows={false}
          data={course.students} isLoading={isLoading} setItemToDelete={setItemToDelete}  />
          </div>    </div>     
    );
}

export default CourseStudents;
