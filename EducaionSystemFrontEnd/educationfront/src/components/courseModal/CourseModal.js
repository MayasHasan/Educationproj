import React, {useState, useEffect } from "react";
import "./CourseModal.css";
import { useSelector, useDispatch } from "react-redux";
import {getStudentDetails, setStudentToCourse,reset } from "../../api/students/studentSlice";
import {
  getcourse,
 
} from "../../api/courses/courseSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CourseModal = (props) => {
  const { course} = useSelector((state) => state.course);
  const { user} = useSelector((state) => state.auth);
  const { isLoading, isSuccess, message, isError } = useSelector(
    (state) => state.student
    );
    const[userCourses , setUserCourses] = useState()

  const dispatch = useDispatch();
const navigate = useNavigate()

  // if (/userCourses/.test(window.location.href)) {
  //   setUserCourses(true)
  // }
  
  useEffect(() => {
    dispatch(reset());
    dispatch(getStudentDetails( user.userId));
    dispatch(getcourse(props.courseId));
  }, [dispatch]);

const handelJoinedToCourse =()=>{
  let coursesIds = []
  coursesIds.push(props.courseId);
  const studentId = user.userId ;
  const myData = {studentId:studentId ,coursesIds: coursesIds}
   dispatch(setStudentToCourse(myData)); 
}

const handelEnterToCourse =()=>{
  navigate(`/myCourses/coursedetails/courseSessions/${props.courseId}`)
}


useEffect(() => {
  if (isError) {
    toast.error(message)
  }
  if (isSuccess) {
    toast.success(" success")
    props.SetCourseModal(false)

  }
dispatch(reset())
}, [dispatch,isLoading,message,isSuccess,isError]);


  return (
    <div className="courseModal">
      <div className="overlay">
        <div className="courseModal-content">
          <div>
            {" "}
            <h2 className="courseModal-Title">{course.title} </h2>{" "}
          </div>
          <div className="courseInfo">
            <p> {course.description}</p>
            <p>
              <span>Level :</span>
              {course.level}
            </p>
            <p>
              <span>Start Date :</span>
              {course.startDate}
            </p>
            <p>
              <span>End Date :</span>
              {course.endDate}
            </p>
            <p>
              <span>Price :</span>
              {course.fullPrice}
            </p>
          </div>

          <div className="courseModal-btn">
            <button type="reset" className="reset-btn"  onClick={/userCourses/.test(window.location.href) ? handelJoinedToCourse : handelEnterToCourse }>
             {/userCourses/.test(window.location.href) ? "Joined" : "Enter"}
            </button>
            <button
              type="button"
              className="reset-btn"
              onClick={() => props.SetCourseModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseModal;
