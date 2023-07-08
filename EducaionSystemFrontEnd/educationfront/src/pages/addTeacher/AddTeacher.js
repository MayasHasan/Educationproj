import React,{useEffect} from 'react';
import './AddTeacher.css';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikField from '../../components/formik/FormikField';
import FormikTextarea from '../../components/formik/FormikTextarea';
import { useSelector, useDispatch } from "react-redux";
import {  useNavigate  } from "react-router-dom";
import {  toast } from 'react-toastify';
import { addTeacher,reset } from '../../api/teachers/teacherSlice';
import Header from '../../components/header/Header';

const AddTeacher = () => {
    const navigate = useNavigate();

    const { isLoading, isSuccess, message ,isError} = useSelector(
      (state) => state.teacher
    );
    const dispatch = useDispatch()
  
    const initialValues = {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        phone:"",
        address:"",
        specialization:"",
        salary:"",
        notes:""
      };
      const validationSchema = Yup.object({
        firstName: Yup.string().required("*"),
      lastName: Yup.string().required("*"),
      userName: Yup.string().required("*"),
      phone: Yup.string().required("*"),
      address: Yup.string().required("*"),
      specialization: Yup.string().required("*"),
      email: Yup.string().email("Invalid email").required("*"),
      });
      const onSubmit = (values) => {
        dispatch(addTeacher(values));
      };
   
      useEffect(() => {
        
        if (isError) {
          toast.error(message)
      
        }
        if (isSuccess) {
          dispatch(reset())
          toast.success("Teacher added successfully")
           navigate("/teachers");
        }
     dispatch(reset())
      }, [dispatch,isLoading,message,isSuccess,isError]);
    

      return (
          <div className="addTeacherinformation">         
            <Header title={"Teacher Information"}/>
           <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >  
            <Form className="addTeacherinformationForm">
              <div className="addTeacherinformationInput">
              <FormikField
               label="First Name"
                type="text"
               name="firstName"
                placeholder="Enter First Name"
              />
              </div>
              <div className="addTeacherinformationInput">
              <FormikField
               label="Last Name"
                  name="lastName"
                type="text"
                placeholder="Enter Last Name"
              />
              </div>
              <div className="addTeacherinformationInput">
              <FormikField
               label="User Name"
                  name="userName"
                type="text"
                placeholder="Enter User Name"
              />
              </div>
              <div className="addTeacherinformationInput">
                    <FormikField
               label="Specialization"
                name="specialization"
                type="text"
                placeholder="Specialization"
              />
                </div>
              
              
              <div className="addTeacherinformationInput">
                      <FormikField
                       label="Address"
                  name="address"
                type="text"
                placeholder="Enter Address"
              />
              </div>
              <div className="addTeacherinformationInput">
                <FormikField
                 label="Phone No."
                  name="phone"
                type="text"
                placeholder="Enter Phone No."
              />
              </div>
              <div className="addTeacherinformationInput">
              <FormikField
               label="Email"
                name="email"
                type="email"
                placeholder="Enter Email"
              /></div>
               <div className="addTeacherinformationInput">
                    <FormikField
               label="Salary"
                name="salary"
                type="text"
                placeholder=" Salary"
              />
              </div>
              <div className="addTeacherinformationInput">
            <FormikTextarea
              label="Notes"
              name="notes"
              type="textarea"
              placeholder="Notes"
            />
          </div>
              <div className="btn">
            <button type="submit" className="create-btn">
             Create
            </button>
            <button type="button" className="reset-btn">
              Reset
            </button>
          </div>
            </Form>
            </Formik>
          </div>
        );
      }

export default AddTeacher;
