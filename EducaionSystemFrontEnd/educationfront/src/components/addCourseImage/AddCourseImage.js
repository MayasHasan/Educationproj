import React, { useState, useEffect } from "react";
import "./AddCourseImage.css";
import defualtImage from "./../../assets/defualtImage.png";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCourseProfileImg, reset } from "../../api/courses/courseSlice";
import { toast } from "react-toastify";
const AddCourseImage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId, courseImage, isLoading, isSuccess, message, isError } =
    useSelector((state) => state.course);
  const [imageToUpload, setImageToUpload] = useState([]);
  const [image, setImage] = useState(defualtImage);

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("FilePath", imageToUpload);
    dispatch(setCourseProfileImg({ courseId, formData }));
  };

  const handleImage = (e) => {
    setImageToUpload(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      toast.success("Image set successfully")
      navigate("/createcourse/addcourseteachre")
   
    }
 dispatch(reset())
  }, [dispatch,isLoading,message,isSuccess,isError]);

  useEffect(() => {
    setImage(courseImage === "" ? defualtImage : courseImage);
  }, []);

  return (
    <div className="addCourseImage">
      <h2>This is what you will see on the course card</h2>
      <div className="addCourseImage-container">
        <div className="addCourseImage-optionBtn">
          <input
            accept="image/*"
            id="icon-button-file"
            type="file"
            style={{ display: "none" }}
            onChange={handleImage}
          />
          <label htmlFor="icon-button-file">
            <AiOutlinePlusCircle color="green" size="2.5em" cursor="pointer" />
          </label>
        </div>
        <div className="addCourseImage-box">
          <div className="addCourseImage-image">
            <img src={image} alt="" />
          </div>
        </div>
      </div>
      <div className="btn addCourseImage-btn">
        <button type="button" className="saveImage-btn" onClick={onSubmit}>
          Save
        </button>
        <button type="button" className="skip-btn" onClick={()=>navigate("/createcourse/addcourseteachre")}>
          Skip
        </button>
      </div>
    </div>
  );
};

export default AddCourseImage;
