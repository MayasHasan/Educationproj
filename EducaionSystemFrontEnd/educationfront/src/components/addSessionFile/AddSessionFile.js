import React,{useState} from 'react';
import './AddSessionFile.css';
import UploadFile from '../uploadFile/UploadFile';

import { useSelector, useDispatch } from "react-redux";
import { createSession,reset,uploadSessionFiles } from '../../api/sessions/sessionSlice';
import {  toast } from 'react-toastify';
import {  useNavigate, useParams  } from "react-router-dom";
const AddSessionFile = () => {
    const navigate = useNavigate();
    let { sessionId } = useParams();
    const dispatch = useDispatch()
    const [fileId] = useState([]);
    const [textfile, setTextFile] = useState([]);
    const [file, setFile] = useState([]);
    const { isLoading, isSuccess, message ,isError} = useSelector(
      (state) => state.session
    );
  
    const sessionFilelist = textfile.map((file, index) => (
        <li key={index}>
          <div className="teacherFilesList">{file.name}  
        <button  className="removeitem"  onClick={() => removeFile(file.name)} > X </button>
        </div>
        </li>
      ));
      

      const removeFile = (fileName) => {
  
     
          setTextFile(textfile.filter(file => file.name !== fileName))
          
       
     
      }

const handelUploadSessionFiles =()=>{
    textfile.forEach(element => {
        const formData = new FormData();
        formData.append( "FilePath", element )
        dispatch(uploadSessionFiles({sessionId,formData}))})
}
      
    
    return (
           
                <div className="sessionFormItem">
                  <label>Upload Session File</label>
                  <UploadFile textfile={textfile} setTextFile={setTextFile}  />
                
                <ol>
                {sessionFilelist}
         

                </ol>
                <button type="submit" className="saveImage-btn" onClick={handelUploadSessionFiles}>
          Save
        </button>
            </div>
          
);
    }

export default AddSessionFile;
