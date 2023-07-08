import React from "react";
import { Field } from "formik";
import FormikErrorMessage from "../formikErrorMessage/FormikErrorMessage";


const FormikSelect = (props) => {
    const{label,name, options,...rest} = props
    return (
       <>
                <label htmlFor={name} style={{ display: "block" }}>
                  {label}
                </label>
                <Field name={name} as="select" {...rest}>
                    {options.map(option=>{
                        return(
                            <option key={option.value} value={option.value}>{option.key}</option>

                        )
                    } )}
                </Field>
                <FormikErrorMessage name={name} />
          
        </>
      );
    };

export default FormikSelect;
