import React from 'react';
import { Field } from "formik";
import FormikErrorMessage from "../formikErrorMessage/FormikErrorMessage";



const FormikTextarea = (props) => {
    const{label,name, options,...rest} = props
    return (
       <>
                <label htmlFor={name} style={{ display: "block" }}>
                  {label}
                </label>
                <Field name={name} as="textarea" {...rest}/>
                <FormikErrorMessage name={name} />
          
        </>
      );
    };

export default FormikTextarea;
