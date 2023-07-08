import React,{useEffect} from 'react';
import "./EditTeacherModal.css";
import { Formik } from 'formik';
import { Form } from 'formik';
import FormikField from './../formik/FormikField';
import FormikTextarea from './../formik/FormikTextarea';
import * as Yup from "yup";
import {  useNavigate  } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTeacherById,reset, updateTeacher } from '../../api/teachers/teacherSlice';
import { toast } from "react-toastify";

const EditTeacherModal = (props) => {
console.log(props)
    const navigate = useNavigate();

    const { teacher,isLoading, isSuccess, message ,isError} = useSelector(
      (state) => state.teacher
    );
    const dispatch = useDispatch()
 
    
    

    const initialValues = {
        firstName:props.teacher.firstName,
        lastName: props.teacher.lastName,
        userName: props.teacher.userName,
        email: props.teacher.email,
        phone:props.teacher.phone,
        address:props.teacher.address,
        specialization:props.teacher.specialization,
        salary:props.teacher.salary,
        notes:props.teacher.notes,
      };
      const validationSchema = Yup.object({
        firstName: Yup.string().required("*"),
      lastName: Yup.string().required("*"),
      phone: Yup.string().required("*"),
      address: Yup.string().required("*"),
      specialization: Yup.string().required("*"),
      email: Yup.string().email("Invalid email").required("*"),
      });
      const onSubmit = (values) => {
        const myData = { teacherId: props.teacher.teacherId, teacherData: values };
        dispatch(updateTeacher(myData));
      };

      useEffect(() => {
    

        if (isError) {
          toast.error(message);
        }
        if (isSuccess) {
          toast.success("Edit Success");
          props.onClick()
        }
      }, [dispatch,isError, message, isSuccess]);
    
    return (
        <div className="editTeacherModal">
             <div className="editTeacherModal-container"> 
                    <div className="editTeacherModal-header"> 

          <h2 className="editTeacherModal-title">Teacher Information</h2>
          </div>
           <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >  
            <Form className="editTeacherModal-Form">
              <div className="editTeacherModal-Input">
              <FormikField
               label="First Name"
                type="text"
               name="firstName"
                placeholder="Enter First Name"
                disabled
              />
              </div>
              <div className="editTeacherModal-Input">
              <FormikField
               label="Last Name"
                  name="lastName"
                type="text"
                placeholder="Enter Last Name"
                disabled
              />
              </div>
              <div className="editTeacherModal-Input">
                    <FormikField
               label="Specialization"
                name="specialization"
                type="text"
                placeholder="Specialization"
                disabled
              />
                </div>
              
              
              <div className="editTeacherModal-Input">
                      <FormikField
                       label="Address"
                  name="address"
                type="text"
                placeholder="Enter Address"
              />
              </div>
              <div className="editTeacherModal-Input">
                <FormikField
                 label="Phone No."
                  name="phone"
                type="text"
                placeholder="Enter Phone No."
              />
              </div>
              <div className="editTeacherModal-Input">
              <FormikField
               label="Email"
                name="email"
                type="email"
                placeholder="Enter email"
              /></div>
               <div className="editTeacherModal-Input">
                    <FormikField
               label="Salary"
                name="salary"
                type="text"
                placeholder=" Salary"
              />
              </div>
              <div className="editTeacherModal-Input">
            <FormikTextarea
              label="Notes"
              name="notes"
              type="textarea"
              placeholder="Notes"
            />
          </div>
              <div className="editTeacherModal-btn">
            <button type="submit" className="Save-btn">
             Save
            </button>
            <button type="reset" className="reset-btn">
              Reset
            </button>
            <button type="button" className="cancel-btn" onClick={props.onClick}>
            Cancel
            </button>
          </div>
            </Form>
            </Formik>
          </div>
        </div>
    );
}

export default EditTeacherModal;
