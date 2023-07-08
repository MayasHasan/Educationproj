import React,{useEffect} from 'react';
import './AddCourseInformation.css';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikField from "../formik/FormikField";
import FormikSelect from '../formik/FormikSelect';
import FormikTextarea from '../formik/FormikTextarea';
import { useSelector, useDispatch } from "react-redux";
import { createCourse,reset ,resetImage} from '../../api/courses/courseSlice';
import {  toast } from 'react-toastify';
import {  useNavigate  } from "react-router-dom";

const AddCourseInformation = () => {
  const navigate = useNavigate();
  const { isLoading, isSuccess, message ,isError} = useSelector(
    (state) => state.course
  );
  const dispatch = useDispatch()
    const levelOptions = [
        { value: "A1", key: "A1" },
        { value: "B1", key: "B1" },
        { value: "C1", key: "C1" },
      ];
  const initialValues = {
    title: "",
    password: "",
    fullPrice: 0,
    description: "",
    startDate: "",
    endDate:"",
    level: "A1"
  };
  const validationSchema = Yup.object({
    title: Yup.string()
    .min(2, "course Name is too short!")
    .max(20, "course Name is too long!")
    .required("*"),
    fullPrice: Yup.number().typeError((' just a number')),
    description: Yup.string()
    .min(2, "description is too short!")
    .max(250, "description  is too long!")
    .required("*"),
  });
  const onSubmit = (values) => {
   dispatch(createCourse(values));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      toast.success("Course created")
      navigate("/createcourse/addcourseimage")
      dispatch(reset())
      dispatch(resetImage())
      
    }
 dispatch(reset())
  }, [dispatch,isLoading,message,isSuccess,isError]);

    return (
        <div className='addCourseInformation'>
            <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="addCourseInformationForm" >
          <div className="addCourseInformationInput">
            <FormikField
              label="Course Name"
              name="title"
              type="text"
              placeholder="Enter Course Name"
            />
          </div>
          <div className="addCourseInformationInput">
            <FormikField
              label="Price"
              name="fullPrice"
              type="text"
              placeholder="Enter Price"
            />
          </div>
          <div className="addCourseInformationInput">
          <FormikSelect label="Level" name="level" options={levelOptions} />
          </div>
          <div className="addCourseInformationInput">
            <FormikField label="From" name="startDate" type="date" />
          </div>
          <div className="addCourseInformationInput">
            <FormikField label="To" name="endDate" type="date" />
          </div>
          
          <div className="addCourseInformationInput">
            <FormikTextarea
              label="description"
              name="description"
              type="textarea"
              placeholder="description"
            />
          </div>
          <div className="btn">
            <button type="submit" className="create-btn">
             Create
            </button>
            <button type="reset" className="reset-btn">
              Reset
            </button>
            <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/courses")}
              >
                Cancel
              </button>
          </div>
        </Form>
      </Formik>
      <div></div>
    </div>
  );
};

export default AddCourseInformation;
