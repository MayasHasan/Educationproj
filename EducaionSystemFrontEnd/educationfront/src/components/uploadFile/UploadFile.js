import React from "react";
import './UploadFile.css';

const UploadFile = ({setTextFile,textfile}) => {
    const handleTextFile =(e)=>{
        const selectedfile = e.target.files[0];
        if(!selectedfile) return;
        selectedfile.isUploading = true;
       
        setTextFile([...textfile, selectedfile])
    
      }

    return (
        <div className="UploadFile">
        <input type="file" 
        onChange={handleTextFile}
         ></input>
      <button
          type="button"
          className="addFilebtn"
        >
    
       Click here
        </button>  
         </div>
    );
}

export default UploadFile;
