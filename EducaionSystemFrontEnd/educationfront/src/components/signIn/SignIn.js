import React,{useEffect} from "react";
import {useNavigate } from "react-router-dom";
import "./SignIn.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikField from '../formik/FormikField';
import { useSelector, useDispatch } from "react-redux";
import {  toast } from 'react-toastify';
import { signIn,reset } from "../../api/auth/authSlice";


const SignIn = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user , isLoading , isSuccess,isError, message} = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    else if (isSuccess && user.roles.includes("User") ) {
    
      navigate("/StudentDashBoard");
    } 
    else if(isSuccess && user.roles.includes("Teacher"))
    {
      navigate("/Courses");
    }

    
  
    dispatch(reset());
  }, [user, isSuccess, isError, message, navigate, dispatch,toast]);
  

  
 

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    password: Yup.string()
      .min(2, "Password is too short!")
      .max(50, "Password is too long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });
  const onSubmit = (values) => {
    dispatch(signIn(values))
   
  };
  return (
    <div className="signIn">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="sigInForm">
          <h2> To start leaning SignIn now </h2>
         {message===""&& <h2> {message}</h2>}
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
            <button className="signIn-btn" type="submit" disabled={isLoading}>
              Sign In
            </button>
            <div className="goTo">
              <span className="span">Don't have an account?</span>
              <span style={{color: "#121d76"}}onClick={() => props.setSignInForm(false)}> Sign Up</span>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SignIn;
