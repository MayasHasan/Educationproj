import React,{useState,useEffect} from 'react';
import "./UploadSessionFileModal.css";
import UploadFile from '../uploadFile/UploadFile';
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import {
    createSession,
    updateSession,
    reset,
    uploadSessionFiles
  } from "../../api/sessions/sessionSlice";
  


const UploadSessionFileModal = (props) => {
 const sessionId= props.sessionId ;
 const { isLoading, isSuccess, message, isError ,isUpladFileSuccess} = useSelector(
    (state) => state.session
  );
    const [addFile,setAddFile] = useState(false);

    const [textfile, setTextFile] = useState([]);
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const removeFile = (fileName) => {
        setTextFile(textfile.filter(file => file.name !== fileName))   
    }
    const sessionFilelist = textfile.map((file, index) => (
        <li key={index}>
          <div className="teacherFilesList">{file.name}  
        <button  className="removeitem" style={{marginLeft:"15px", color:"red" }}  onClick={() => removeFile(file.name)}> Remove </button>
        </div>
        </li>
      ));
      
    const handelUploadSessionFiles =()=>{
        textfile.forEach(element => {
            const formData = new FormData();
            formData.append( "FilePath", element )
            dispatch(uploadSessionFiles({sessionId,formData}))})
    }
          

    const handelCancelAddModal = () => {
        props.setSessionFileModal(false)
      };


      useEffect(() => {
        if (isError) {
          toast.error(message);
        }
         if (isUpladFileSuccess) {
          toast.success("Upload File Success");
          handelCancelAddModal()
         }
        dispatch(reset());
      }, [dispatch, isLoading, message, isSuccess, isError,isUpladFileSuccess]);

      
    return (
        <div className="overlay">
        <div className="sessionModal-content">
        <h2>Upload Session's Files</h2>
                  <UploadFile textfile={textfile} setTextFile={setTextFile}  />
                
                <ol>
                {sessionFilelist}
         

                </ol>
                <div className="addFile-btn">
                <button type="button" className="save-btn" onClick={handelUploadSessionFiles}>
          Save
        </button>
        <button
                  type="button"
                  className="cancel-btn"
                  onClick={handelCancelAddModal}
                >
                  Cancel
                </button>
                </div>
        
        </div>    
        </div>
    );
}

export default UploadSessionFileModal;
