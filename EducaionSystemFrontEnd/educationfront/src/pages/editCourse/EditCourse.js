import React, { useEffect, useState } from "react";
import "./EditCourse.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import defualtImage from "./../../assets/defualtImage.png";

import {
  updateCourse,
  getCourseProfileImg,
  getcourse,
  reset,
  resetImage,
  setCourseProfileImg,
} from "../../api/courses/courseSlice";
import { getTeachers } from "../../api/teachers/teacherSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import FormikField from "../../components/formik/FormikField";
import FormikSelect from "../../components/formik/FormikSelect";
import FormikTextarea from "./../../components/formik/FormikTextarea";
import { FcEditImage } from "react-icons/fc";
import Header from "../../components/header/Header";

const EditCourse = () => {
  let { courseId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { course, courseImage, isLoading, isSuccess, message, isError } =
    useSelector((state) => state.course);
  const { teachers } = useSelector((state) => state.teacher);
  const [imageToUpload, setImageToUpload] = useState([]);
  const [image, setImage] = useState();

  const handleImage = (e) => {
    setImageToUpload(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };
  const levelOptions = [
    { value: "A1", key: "A1" },
    { value: "B1", key: "B1" },
    { value: "C1", key: "C1" },
  ];

  useEffect(() => {
    dispatch(reset());
  }, [dispatch,isSuccess]);



  useEffect(() => {
    dispatch(getcourse(courseId));
    dispatch(getTeachers());
    dispatch(getCourseProfileImg(courseId));
    dispatch(reset());
  }, [dispatch]);

  
  useEffect(() => {
    dispatch(reset());
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success("Edit Success");
      navigate("/courses");
    }
  }, [dispatch, isError, message, courseId,isSuccess]);


  useEffect(() => {
    setImage(courseImage==="http://localhost:5000/"  ? defualtImage : courseImage );
  }, [courseImage]);

  const initialValues = {
    title: course.title,
    fullPrice: course.fullPrice,
    description: course.description,
    startDate: course.startDate,
    endDate: course.endDate,
    level: course.level,
    teacherId: course.teacherId,
  };
  const validationSchema = Yup.object({
    title: Yup.string()
      .min(2, "course Name is too short!")
      .max(20, "course Name is too long!")
      .required("*"),
    fullPrice: Yup.number().typeError(" just a number"),
    description: Yup.string()
      .min(2, "description is too short!")
      .max(250, "description  is too long!")
      .required("*"),
  });
  const onSubmit = (values) => {
    const myData = { courseId: courseId, courseData: values };
    dispatch(updateCourse(myData));
    if(imageToUpload.length!== 0){
      const formData = new FormData();
    formData.append("FilePath", imageToUpload);
    dispatch(setCourseProfileImg({ courseId, formData }));
    if (isSuccess) {
      toast.success("Edit Success");
      navigate("/courses");
    }}
  };

  var options = [];
  teachers.forEach((teacher) => {
    options.push({
      value: `${teacher.teacherId}`,
      key: `${teacher.firstName} ${teacher.lastName}`,
    });
  });
  return (

    <div className="editCourse">
<Header title = {`Edit ${course.title}`}/>
<div className="editCourse-container">
      <div className="editCourse-information">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          <Form className="editCourseForm">
            <div className="editCourseInput">
              <FormikField
                label="Course Name"
                name="title"
                type="text"
                placeholder="Enter Course Name"
              />
            </div>
            <div className="editCourseInput">
              <FormikField
                label="Price"
                name="fullPrice"
                type="text"
                placeholder="Enter Price"
              />
            </div>
            <div className="editCourseInput">
              <FormikSelect label="Level" name="level" options={levelOptions} />
            </div>

            <div className="editCourseInput">
              <FormikField label="From" name="startDate" type="date" />
            </div>
            <div className="editCourseInput">
              <FormikField label="To" name="endDate" type="date" />
            </div>
            <div className="editCourseInput">
              <FormikSelect
                label="Teacher "
                name="teacherId"
                options={options}
              />
            </div>
            <div className="editCourseInput">
              <FormikTextarea
                label="description"
                name="description"
                type="textarea"
                placeholder="description"
              />
            </div>
            <div className="btn">
              <button type="submit" className="save-btn" disabled={isLoading}>
                Save
              </button>
              <button type="reset" className="cancel-btn">
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
      </div>
      <hr></hr>
      <div className="editCourse-image">
        <div className="editCourseImage-container">
          <div className="editCourseImage-optionBtn">
            <input
              accept="image/*"
              id="icon-button-file"
              type="file"
              style={{ display: "none" }}
              onChange={handleImage}
            />
            <label htmlFor="icon-button-file">
              <FcEditImage
                color="green"
                size="2.5em"
                cursor="pointer"
              />
            </label>
          </div>
          <div className="editCourseImage-box">
            <div className="editCourseImage-image">
              <img src={image} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>   </div>
  );
};

export default EditCourse;
