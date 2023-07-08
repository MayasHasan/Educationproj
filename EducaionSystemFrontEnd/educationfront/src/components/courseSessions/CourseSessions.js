import React,{useState,useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import './CourseSessions.css';

import { useNavigate } from "react-router-dom";
import DataTableComponent from '../dataTable/DataTableComponent';
import { deleteSession,reset } from '../../api/sessions/sessionSlice';
import { getcourse } from '../../api/courses/courseSlice';
import SessionModal from '../sessionModal/SessionModal';
import UploadSessionFileModal from '../uploadSessionFileModal/UploadSessionFileModal';


const CourseSessions = () => {
  const { user} = useSelector((state) => state.auth);

  const {course, isLoading, message, isError } =
  useSelector((state) => state.course);
  const {sessionId,session , isSuccess}=useSelector((state) => state.session);
  const[sessionFileModal,setSessionFileModal]=useState(false)
  const[addSessionModal,setAddSessionModal]=useState(false)
  const[editSessionModal,setEditSessionModal]=useState(false)

  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sessionToDelete , setSessionToDelete]= useState()
  
  useEffect(() => {
    dispatch(reset());
    dispatch(getcourse(course.courseId));
  },[dispatch,isSuccess])


  
      var columns = [
          {
            name :"Session Title",
            selector: row => row.sessionTitle , 
            sortable:true,
         sortFiled:"sessionTitle"
          },
         
          {
            name :"Session Date",
            selector: row => row.date,
            sortable:true,
            sortFiled:"date"
          },
          
          {
            name : "",
        cell : (row)=>(
          <div style={{display:"flex" , gap:"2px"}}>
        <button style={{color:"white" , border:"none" , background:"blue", width:"50px" , height:"25px" , cursor:"pointer"}} onClick={()=>navigate(user.roles.includes("Teacher")?`/sessionDetails/${row.sessionId}`:`/myCourses/sessionDetails/${row.sessionId}`)}>View</button>
        
        {user.roles.includes("Teacher") && <button style={{color:"white" , border:"none" , background:"green", width:"50px" , height:"25px" , cursor:"pointer"}} onClick={()=>handleEdit(row)}>Edit</button>}
        </div>
       )
          }
        ];
const handleEdit =(session)=>{

  setEditSessionModal(true)


}

const handelAddSession = () => { 
  setAddSessionModal(true)
  };


  useEffect(() => {
    if (isSuccess) {
      setSessionFileModal(true)
    }
    dispatch(reset())
  }, [dispatch, isSuccess]);

        const handleDeleteSession = () => { 
           dispatch(deleteSession(sessionToDelete[0].sessionId))
        
          };
    
          const handlePrevious =()=>{
            navigate(-1)

            }

    return (
      
          <div className='courseSession'>
              <div className="courseSession-btn" style={{justifyContent: user.roles.includes("User") ?"flex-end":"space-between" }} >
              {user.roles.includes("Teacher") &&  <div className='addSession-btn'> <button onClick={handelAddSession}>Add Session</button></div>}
                <div>
              <button
                type="button"
                className="cancel-btn"
                onClick={handlePrevious}
              >
                Previous
              </button>
                <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/courses")}
              >
                Cancel
              </button>
             
              </div>
              </div>
  <div>
         <DataTableComponent columns={columns} selectableRows={true} title={"Course's Session"}
          data={course.sessions} isLoading={isLoading} setItemToDelete={setSessionToDelete} deleteItem={handleDeleteSession} />
          </div> 
          {addSessionModal&& <SessionModal  title={"Add new session"} setAddSessionModal={setAddSessionModal}/>}  
          {sessionFileModal&& <UploadSessionFileModal setSessionFileModal={setSessionFileModal} sessionId={sessionId} />}
          {editSessionModal&& <SessionModal  title={`Edit Session`} session={session} setEditSessionModal={setEditSessionModal}/>}  

   
          </div> 
    );
}
 

export default CourseSessions;





