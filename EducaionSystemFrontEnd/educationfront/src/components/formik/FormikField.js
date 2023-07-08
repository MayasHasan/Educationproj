import React from "react";
import { Field } from "formik";
import FormikErrorMessage from "../formikErrorMessage/FormikErrorMessage";


const FormikField = ({ name, type, placeholder,label ,disabled}) => {
  return (
    <Field name={name}>
      {(formikField) => {
        return (
          <>
            <label htmlFor={name} style={{ display: "block" }}>
              {label}
            </label>
            <input
              type={type}
              id={name}
              disabled={disabled}
              placeholder={placeholder}
              {...formikField.field}
              defaultChecked={formikField.field.value}
     
          
            />
            <FormikErrorMessage name={name} />
          </>
        );
      }}
    </Field>
  );
};

export default FormikField;