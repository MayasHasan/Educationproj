import axios from 'axios'

const API_URL='http://localhost:5000/api/v1/Teacher/'


//create coures
const addTeacher = async(teacherData ,token)=>{
    const config = {
       headers :{
           Authorization : `Bearer ${token}`
       }
    }
   
       const response = await axios.post(API_URL,teacherData,config)
       return response.data
   }

   //get all Teachers 
   const getTeachers = async(myData,token)=>{
      const {pageNumber, pageSize,sortOrder,searchString,salary,joinedDate} = myData;

      const getAll_URL=`http://localhost:5000/api/v1/Teacher?PageNumber=${pageNumber}&PageSize=${pageSize}&sortOrder=${sortOrder}&searchString=${searchString}&salary=${salary}&joinedDateFrom=${joinedDate}`

       const config = {
          headers :{
              Authorization : `Bearer ${token}`
          
          }
       }
      
          const response = await axios.get(getAll_URL,config)
        
          return response.data
      }
   
  //  Assign a teacher to course
   const setTeacherToCourse  = async(myData,token)=>{
      const {teacherId, coursesIds} = myData;
      const API_CourseTeacherURL=`http://localhost:5000/api/v1/Teacher/${teacherId}/courses`
    const config = {
       headers :{
           Authorization : `Bearer ${token}`,
       }     
    }
       const response = await axios.put(API_CourseTeacherURL,coursesIds,config)
       return response.data
   }


   const deleteTeacher = async(teacherId,token)=>{
      const config = {
         headers :{
             Authorization : `Bearer ${token}`
         }
      }
     
      const response = await axios.delete(API_URL+teacherId,config)
       
         return response.data
     }





//    const setTeacherToCourse  =async(teacherId,token)=>{
//        const API_CourseTeacherURL=`http://localhost:5000/api/v1/Teacher/${teacherId}/courses?coursesIds=3c4fbe38-2ad5-4da6-d672-08db4a4563de`

//        fetch(API_CourseTeacherURL, {
//       method: "PUT", 
//       headers: {
//           'Content-type': 'application/json'
//       },
//       body: "3c4fbe38-2ad5-4da6-d672-08db4a4563de"
      
//   })

//    }
   
   //get all Categiry 
   
//    const getCategories = async(token)=>{
//        const config = {
//           headers :{
//               Authorization : `Bearer ${token}`
//           }
//        }
      
//           const response = await axios.get(API_URL+"allwithevents?includeHistory=false",config)
        
//           return response.data
//       }
const getTeacherById = async(teacherId,token)=>{
   const config = {
      headers :{
          Authorization : `Bearer ${token}`
      }
   }
  
      const response = await axios.get(API_URL+teacherId,config)
    
      return response.data
  }


  // Update teacher

  const updateTeacher = async(myData,token)=>{
   const {teacherId,teacherData} = myData
const Update_URL=`http://localhost:5000/api/v1/Teacher/${teacherId}`

const config = {
   headers :{
       Authorization : `Bearer ${token}`,

   }
}

   const response = await axios.put(Update_URL,teacherData,config)
 
   return response.data
}


      const teacherService = {addTeacher,getTeachers,setTeacherToCourse , deleteTeacher,getTeacherById,updateTeacher }

      export default teacherService ;