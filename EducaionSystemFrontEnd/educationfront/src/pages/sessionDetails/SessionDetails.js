import React, { useState, useEffect } from "react";
import "./SessionDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import DataTableComponent from "../../components/dataTable/DataTableComponent";
import {
  getSessionDetails,
  reset,
  downloadSessionFile,
  deleteFileFromSession,
} from "../../api/sessions/sessionSlice";
import UploadSessionFileModal from "../../components/uploadSessionFileModal/UploadSessionFileModal";

const SessionDetails = () => {
  const[sessionFileModal,setSessionFileModal]=useState(false)
  const { user} = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const { session, isLoading, isSuccess,isUpladFileSuccess } = useSelector(
    (state) => state.session
  );
  const [fileToDeleteFromSession, setFileToDeleteFromSession] = useState();

  useEffect(() => {
    dispatch(reset());
    dispatch(getSessionDetails(sessionId));
  }, [dispatch,isUpladFileSuccess,isSuccess]);



  var columns1 = [
    {
      name: "File Name",
      selector: (row) => row.fileName,
      sortFiled: "File Name",
    },

    {
      name: "Date",
      selector: (row) => row.insertOn,
      sortable: true,
      sortFiled: "insertOn",
    },

    {
      name: "",
      cell: (row) => (
        <div style={{display:"flex" , gap:"2px"}}>
          <button  onClick={() => downloadFile(row.fileId)} style={{color:"white" , border:"none" , background:"blue",   height:"25px" , cursor:"pointer"}} >
            Download File
          </button>
          <button onClick={() => navigate(`/editcourse/${row.fileId}`)}  style={{color:"white" , border:"none" , background:"red", height:"25px" , cursor:"pointer"}}>
            Watch video
          </button>
        </div>
      ),
    },
  ];

  const downloadFile = (fileId) => {
    const myData = { fileId: fileId, sessionId: sessionId };
    dispatch(downloadSessionFile(myData));
  };

  var columns2 = [
    {
      name: "First Name",
      selector: (row) => row.FirstName,
      sortable: true,
      sortFiled: "FirstName",
    },

    {
      name: "Last Name",
      selector: (row) => row.LastName,
      sortable: true,
      sortFiled: "LastName",
    },
    {
      name: "Phone",
      selector: (row) => row.Phone,
      sortable: true,
      sortFiled: "Phone",
    },
    {
      name: "Email",
      selector: (row) => row.Email,
      sortable: true,
      sortFiled: "Email",
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          {/* <button onClick={()=>navigate(`/sessionDetails/${row.sessionId}`)}>View</button>
      <button onClick={()=>navigate(`/editcourse/${row.courseId}`)}>Edit</button> */}
        </>
      ),
    },
  ];

  const handleDeleteFileFromSession = () => {
    const myData = {
      fileId: fileToDeleteFromSession[0].fileId,
      sessionId: sessionId,
    };
    dispatch(deleteFileFromSession(myData));
  };

  
  const setItemToDelete = () => {};

  const handleDelete = () => {};

  return (
    <div className="sessionDetails">
      <h1 className="sessionDetails-header">
        {" "}
        <span> Session title : {session.sessionTitle}</span>{" "}
        <span> {session.date}</span>
        <span>   
        {user.roles.includes("Teacher") &&  <button
          className="uploadFile-btn"
            onClick={() =>
              setSessionFileModal(true)
            }
          >
            Uplaod File
          </button>}
          <button
          className="back-btn"
            onClick={() =>
              navigate(-1)
            }
          >
            Back
          </button>{" "}
      
          </span>
      </h1>
      <p className="sessionDescription">{session.Description}</p>

      <fieldset>
        <legend>Session's files</legend>
        <div className="sessionDetails-files">
          <DataTableComponent
            columns={columns1}
            selectableRows={true}
            title={"Session's files"}
            data={session.files}
            isLoading={isLoading}
            setItemToDelete={setFileToDeleteFromSession}
            deleteItem={handleDeleteFileFromSession}
          />
        </div>
      </fieldset>

      {user.roles.includes("Teacher") &&  <fieldset>
        <legend>Session's students</legend>
        <div className="sessionDetails-students">
          <DataTableComponent
            columns={columns2}
            selectableRows={true}
            data={session.students}
            isLoading={isLoading}
            setItemToDelete={setItemToDelete}
            deleteItem={handleDelete}
          />
        </div>
      </fieldset>}
      {sessionFileModal&& <UploadSessionFileModal setSessionFileModal={setSessionFileModal} sessionId={sessionId} />}
    </div>
  );
};

export default SessionDetails;
