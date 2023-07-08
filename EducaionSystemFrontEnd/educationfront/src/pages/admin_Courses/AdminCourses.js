import React,{useState,useEffect} from "react";
import "./AdminCourses.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikField from "../../components/formik/FormikField";
import FormikSelect from "../../components/formik/FormikSelect";
import { useSelector, useDispatch } from "react-redux";
import { getCourses,deleteCourse , reset,resetImage } from "../../api/courses/courseSlice";
import DataTableComponent from "../../components/dataTable/DataTableComponent";
import {useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SessionModal from "../../components/sessionModal/SessionModal";
import UploadSessionFileModal from "../../components/uploadSessionFileModal/UploadSessionFileModal";
import Header from './../../components/header/Header';

const AdminCourses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const[sessionFileModal,setSessionFileModal]=useState(false)

  const {courses,isDeleted,isLoading } = useSelector(
    (state) => state.course
    );
    const { sessionId, isSuccess} = useSelector(
      (state) => state.session
    );
    const [courseId , setCourseId]= useState()
    
    const[addSessionModal,setAddSessionModal]=useState(false)
const [itemToDelete , setItemToDelete]= useState()
  var columns = [
    {
      name :"Title",
      selector: row => row.title , 
      sortable:true,
   sortFiled:"Title"
    },
    {
      name :"Price",
      selector: row => row.fullPrice,
      sortable:true,
      sortFiled:"FulPrice"
    },
    {
      name :"Start Date",
      selector: row => row.startDate,
      sortable:true,
      sortFiled:"StartDate"
    },
    {
      name :"Level",
      selector: row => row.level,
      sortable:true,
      sortFiled:"Level"
    },
    {
      name : "",
  cell : (row)=>(
   <div style={{display:"flex" , gap:"2px"}}>
  <button style={{color:"white" , border:"none" , background:"blue", width:"50px" , height:"25px" , cursor:"pointer"}} onClick={()=>navigate(`/coursedetails/${row.courseId}`)}>View</button>
  <button  style={{color:"white" , border:"none" , background:"green", width:"50px" , height:"25px", cursor:"pointer"}} onClick={()=>navigate(`/editcourse/${row.courseId}`)}>Edit</button>
  <button  style={{color:"white" , border:"none" , background:" #f55e30",width:"80px",  height:"25px", cursor:"pointer"}} onClick={()=>{handelAddSession(row.courseId)}}>Add Session</button>

  </div>
 )
    }
  ];


  const options = [
    { value: "A1", key: "A1" },
    { value: "B1", key: "B1" },
    { value: "C1", key: "C1" },
  ];
  const initialValues = {
    title: "",
    price: "",
    level: "",
    startDate: "",
    endDate: "",
    pageNumber:1,
   pageSize:10000,
  };
  const validationSchema = Yup.object({
    price: Yup.number().typeError((' just a number')),
  });
  
  useEffect(() => {
    dispatch(reset()); 
    dispatch(resetImage()); 
    dispatch(getCourses(initialValues));
  }, [dispatch]);

  const onSubmit = (values) => {
   dispatch(getCourses(values));

};
const handleDelete = () => { 
  dispatch( deleteCourse(itemToDelete[0].courseId));
  dispatch(reset()); 

  };

  const handelAddSession = (courseId) => { 
    setCourseId(courseId)
    setAddSessionModal(true)
    };
    
  useEffect(() => {
    if (isDeleted) {
      toast.success("Deleted successfully") 
      dispatch(getCourses(initialValues));
    }
  }, [dispatch, isDeleted]);


  
  useEffect(() => {
    if (isSuccess) {
      setSessionFileModal(true)
    }
    dispatch(reset())
  }, [dispatch, isSuccess]);

const handleReset =()=>{
  dispatch(reset()); 
  dispatch(getCourses(initialValues));
}
const handleCreate =()=>{
  dispatch(reset()); 
  dispatch(resetImage()); 
  navigate("/createcourse/addcourseinformation")
}


  return (
    <div className="adminCourses">
      <div>
      <Header title={"Courses"}/>
      </div>
      <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        
      >
        <Form className="adminCourseform">
          <div className="searchCourseItem">
            <FormikField
              label="Course Name"
              name="title"
              type="text"
              placeholder="Enter Course Name"
             
            />            
          </div>
          <div className="searchCourseItem">
            <FormikField
              label="Price"
              name="price"
              type="text"
              placeholder="Enter Price"
           
            />
          </div>
          <div className="searchCourseItem">
            <FormikField label="From" name="startDate" type="date" />
          </div>
          <div className="searchCourseItem">
            <FormikField label="To" name="endDate" type="date" />
          </div>
          <div className="searchCourseItem">
          <FormikSelect label="Level" name="level" options={options} />
          </div>
          <div className="adminCourse-btn">
            <button type="submit" className="adminCourseSearch-btn">
              Search
            </button>
            <button type="reset" className="adminReset-btn" onClick={handleReset} >
              Reset
            </button>
            <button type="button" className="adminCourseCreate-btn" onClick={handleCreate}>
              Create
            </button>
          </div>
        </Form>
      </Formik></div>
      <div>
      <DataTableComponent columns={columns} selectableRows={true} title={`Total of Courses ${courses.length}`}
          data={courses} isLoading={isLoading} setItemToDelete={setItemToDelete} deleteItem={handleDelete}  />
          </div>
          {addSessionModal&& <SessionModal courseId={courseId} title={"Add new session"} setAddSessionModal={setAddSessionModal}/>}  
          {sessionFileModal&& <UploadSessionFileModal setSessionFileModal={setSessionFileModal} sessionId={sessionId} />}

    </div>
  );
};
export default AdminCourses;
