import React, {useState, useEffect } from "react";
import "./SessionModal.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikField from "../formik/FormikField";
import FormikTextarea from "../formik/FormikTextarea";
import { useSelector, useDispatch } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";

import {
  createSession,
  updateSession,
  reset,
  uploadSessionFiles
} from "../../api/sessions/sessionSlice";

import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import UploadFile from './../uploadFile/UploadFile';
import UploadSessionFileModal from "../uploadSessionFileModal/UploadSessionFileModal";

const SessionModal = (props) => {
  const dispatch = useDispatch();
  let { courseId } = useParams();
  let { sessionId } = useParams();
  const {  isLoading, isSuccess, message, isError ,isUpladFileSuccess} = useSelector(
    (state) => state.session
  );
const [cId ,setCid] = useState();
useEffect(() => {
  if(/courses/.test(window.location.href)) {
    setCid(props.courseId)
  }
  else setCid(courseId)
}, []);


  const initialValues =
    props.title === "Add new session"
      ? {
          courseId: cId ,
          sessionTitle: "",
          description: "",
          date: new Date(),
        }
      : {
          courseId: courseId,
          sessionTitle: props.session.sessionTitle,
          description: props.session.description,
          date: props.session.date,
        };
  const validationSchema = Yup.object({
    sessionTitle: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  });
  const onSubmit = (values) => {
    if (props.title === "Add new session") {
      dispatch(createSession(values));
    } else {
      const id = props.session.sessionId;
      const myData = { sessionId: id, sessionData: values };
      dispatch(updateSession(myData));
    }
  };

  const handelCancelEditModal = () => {
    props.setEditSessionModal(false);
  };
  
  const handelCancelAddModal = () => {
    props.setAddSessionModal(false);
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess && props.title === "Add new session" ) {
      toast.success("Session created");
      handelCancelAddModal()
  
     }
    
      else if (isSuccess && props.title === "Edit Session" ){
        toast.success("Edit Success");
        handelCancelEditModal()
        
      }
     dispatch(reset())

  }, [dispatch, isLoading, message, isSuccess, isError ]);

  return (
    <div className="sessionModal">
      <div className="overlay">
        <div className="sessionModal-content">
          <h1>{props.title}</h1>
         <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            <Form className="addSessionInformationForm">
              <div className="addSessionInformationInput">
                <FormikField
                  label="Session Title"
                  name="sessionTitle"
                  type="text"
                  placeholder="Enter Session Title"
                  
                />
              </div>
              <div className="addSessionInformationInput">
                <FormikTextarea
                  label="Description"
                  name="description"
                  type="textarea"
                  placeholder="Description"
                />
              </div>
                <div className="addSessionInformation-btn">
                <button type="submit" className="create-btn" >
                  {props.title === "Edit Session" ? "Save" : "Create"}
                </button>
                <button type="reset" className="reset-btn">
                  Reset
                </button>
                <button
                  type="button"
                  className="reset-btn"
                  onClick={
                    props.title === "Edit Session"
                      ? handelCancelEditModal
                      : handelCancelAddModal
                  }
                >
                  Cancel
                </button>
              </div>
            </Form>
          </Formik>

        </div>
      </div>
    </div>
  );
};

export default SessionModal;
