import React, { useEffect } from "react";
import "./AddCourseTeachre.css";
import { Formik, Form } from "formik";
import FormikSelect from "../formik/FormikSelect";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTeachers ,setTeacherToCourse, reset } from "../../api/teachers/teacherSlice";
import { toast } from "react-toastify";
import * as Yup from "yup";

const AddCourseTeachre = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { teachers , isLoading, isSuccess, message, isError} = useSelector((state) => state.teacher);
  const { courseId } = useSelector(
    (state) => state.course
  );

 
  useEffect(() => {
    dispatch(getTeachers());
  }, [dispatch]);


  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      toast.success("Teacher set successfully")
      navigate("/courses")

    }
 dispatch(reset())
  }, [dispatch,isLoading,message,isSuccess,isError]);

  var options = [{value:"Choose a teacher" , key : "Choose a teacher"}];
  teachers.forEach(teacher => {
    options.push({value: `${teacher.teacherId}`, key: `${teacher.firstName} ${teacher.lastName}` });

});

  const initialValues = {
    teacherId: "",
  };

    const validationSchema = Yup.object({
      teacherId: Yup.string('Choose a teacher').required("*")

        })

  const onSubmit = (value) => {
    let coursesIds = []
    coursesIds.push(courseId);
    const teacherId = value.teacherId ;
    const myData = {teacherId:teacherId ,coursesIds: coursesIds}
     dispatch(setTeacherToCourse(myData)); 
  };

  return (
    <div className="addCourseTeacher">
      <h2>Set Teacher for this course</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className="addCourseTeacherForm">
          <div className="addCourseTeacherInput">
            <FormikSelect label="Teacher " name="teacherId" options={options}  />
          </div>
          <div className="btn">
            <button
              className="back-Btn"
              onClick={() => navigate("/createcourse/addcourseimage")}
            >
              Back
            </button>
            <button type="submit" className="saveCourseTeacher-btn">
              Save
            </button>
            <button type="button" className="skip-btn" onClick={()=>navigate("/courses")}>
          Skip
        </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AddCourseTeachre;
