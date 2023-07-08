import React,{useState,useEffect} from 'react';
import "./AdminTeachers.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikField from "../../components/formik/FormikField";
import FormikSelect from "../../components/formik/FormikSelect";
import { useSelector, useDispatch } from "react-redux";
import { getTeachers,deleteTeacher, reset} from '../../api/teachers/teacherSlice';
import { AiOutlineMore } from "react-icons/ai";
import DataTableComponent from "../../components/dataTable/DataTableComponent";
import { Link , useNavigate } from "react-router-dom";
import DeleteModal from "../../components/deleteModal/DeleteModal";
import EditTeacherModal from '../../components/editTeacherModal/EditTeacherModal';
import Header from './../../components/header/Header';
import { toast } from "react-toastify";

const AdminTeachers = () => {
  const dispatch = useDispatch();
  const { teachers,isDeleted, isLoading, isSuccess, message, isError } = useSelector(
    (state) => state.teacher
    );
    const [editTeacherModal, setEditTeacherModal] = useState(false);
    const [teacher, setTeacher] = useState();
    const [itemToDelete , setItemToDelete]= useState()
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
        sortFiled:"Last Name"
      },
     
      {
        name :"Specialization",
        selector: row => row.specialization,
        sortable:true,
        sortFiled:"specialization"
      },
      {
        name :"Salary",
        selector: row => row.salary,
        sortable:true,
        sortFiled:"Salary"
      },
      {
        name :"Joined Date",
        selector: row => row.joinedDate,
        sortable:true,
        sortFiled:"Joined Date"
      },
      {
        name : "",
    cell : (row)=>(
      <div style={{display:"flex" , gap:"2px"}}>
    <button style={{color:"white" , border:"none" , background:"green", width:"50px" , height:"25px", cursor:"pointer"}} onClick={()=>toggleEditTeacherModal(row)}>Edit</button>
    
    </div>
   )
      }
    ];

    useEffect(() => {
      dispatch(reset()); 
      dispatch(getTeachers(initialValues));
    }, [dispatch ,isDeleted]);


    useEffect(() => {
    
      if (isSuccess) {
        dispatch(getTeachers(initialValues));

      }
    }, [dispatch,isError, message, isSuccess]);
  



    const handleDelete = () => { 
      dispatch( deleteTeacher(itemToDelete[0].teacherId)); 
      

      };

   

      const toggleEditTeacherModal = (teacher) => {
        setEditTeacherModal(!editTeacherModal)
        setTeacher(teacher)
        dispatch(reset());

      };

      useEffect(() => {
        if (isDeleted) {
          toast.success("Deleted successfully") 
          dispatch(getTeachers(initialValues));
        }
      }, [dispatch, isDeleted]);
    
    

  const initialValues = {
    searchString:"",
    joinedDate:"",
    salary:"",
    specialization:"",
    pageNumber:1,
    pageSize:10000,
  }

  const validationSchema = Yup.object({
    salary: Yup.number().typeError((' just a number')),
  });
  const onSubmit = (values) => {
    dispatch(getTeachers(values))
  };
    return (
        <div className="adminTeachers">
        <Header title={"Teachers"}/>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="adminTeacherform">
            <div className="searchTeacherItem">
              <FormikField
                label="Name / Specialization"
                name="searchString"
                type="text"
                placeholder="Enter First Name"
              />
            </div>
      
               <div className="searchTeacherItem">
              <FormikField
                label="Salary"
                name="salary"
                type="text"
                placeholder="Enter Salary"
              />
            </div>
            <div className="searchTeacherItem">
              <FormikField label="Joined Date" name="joinedDate" type="date" />
            </div>  
  
            <div className="adminTeacher-btn">
              <button type="submit" className="adminTeacherSearch-btn">
                Search
              </button>
              <button type="button" className="adminReset-btn">
                Reset
              </button>
            </div>
          </Form>
        </Formik>
        <div>

     
        <DataTableComponent columns={columns} selectableRows={true} title={`Total of Teachers ${teachers.length}`}
          data={teachers} isLoading={isLoading} setItemToDelete={setItemToDelete} deleteItem={handleDelete}  />  
           </div>
         
  {editTeacherModal && (
            <EditTeacherModal onClick={toggleEditTeacherModal} teacher={teacher}/>
            )}



      </div>
    );
  };

export default AdminTeachers;
