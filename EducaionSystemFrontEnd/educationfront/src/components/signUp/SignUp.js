import React,{useEffect} from 'react';
import "./SignUp.css";
import { Link,useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikField from '../formik/FormikField';
import { useSelector, useDispatch } from "react-redux";
import { register,reset } from "../../api/auth/authSlice";
import {  toast } from 'react-toastify';

const SignUp = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user , isSuccess,isError, message} = useSelector((state) => state.auth);
  
    const initialValues = {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      phone:"",
      address:""
    };
    const validationSchema = Yup.object({
      firstName: Yup.string().required("Requierd"),
    lastName: Yup.string().required("Requierd"),
    userName: Yup.string().required("Requierd"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Requierd"),
    });
    const onSubmit = (values) => {
      dispatch(register(values))
    };

  
    useEffect(() => {
      if (isError) {
        toast.error(message)
      }
       if (isSuccess  ) {
        toast.success("Account created")

        navigate("/StudentDashBoard");
      } 
   
     
      dispatch(reset());
    }, [user, isSuccess, isError, message, navigate, dispatch,toast]);
    
    
    return (
        <div className="signUp"> 
         <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >  
          <Form className="signUpForm">
            <h2 >Create Account</h2>
            <div className="inputItem">
            <FormikField
              type="text"
             name="firstName"
              placeholder="Enter your First Name"
            />
            </div>
            <div className="inputItem">
            <FormikField
                name="lastName"
              type="text"
              placeholder="Enter your Last Name"
            />
            </div>
            <div className="inputItem">
            <FormikField
                name="userName"
              type="text"
              placeholder="Enter your User Name"
            />
            </div>
            <div className="inputItem">
              <FormikField
                name="phone"
              type="text"
              placeholder="Enter your Phone No."
            />
            </div>
            <div className="inputItem">
                    <FormikField
                name="address"
              type="text"
              placeholder="Enter your Address"
            />
            </div>
            <div className="inputItem">
            <FormikField
              name="email"
              type="email"
              placeholder="Enter your email"
            />
            </div>
            <div className="inputItem">
            <FormikField
              name="password"
              type="password"
              placeholder="Enter your Password"
            />
            </div>
            <div className="signIn-signUp">
      <button type="submit" className="signUp-btn" >Sign Up</button>
      <div >
      <div className="goTo">
      <span className='span'>Already have an account?  </span>
      <span style={{color: "#121d76"}} onClick={()=>props.setSignInForm(true)}>Sign In</span>
         </div>
      </div>
      </div>
          </Form>
          </Formik>
        </div>
      );
    }
  
  export default SignUp;
  