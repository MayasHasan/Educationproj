import axios from 'axios'

const API_URL='http://localhost:5000/api/v1/Student/'
//create student
const createStudent = async(studentData ,token)=>{
   
    const config = {
       headers :{
           Authorization : `Bearer ${token}`
       }
    }

       const response = await axios.post(API_URL,studentData,config)
       return response.data
   }

      const getStudents = async(myData,token)=>{
        const {pageNumber, pageSize,sortOrder,searchString,joinedDateFrom,joinedDateTo} = myData;
        const getAll_URL=`http://localhost:5000/api/v1/Student?PageNumber=${pageNumber}&PageSize=${pageSize}&sortOrder=${sortOrder}&searchString=${searchString}&joinedDateFrom=${joinedDateFrom}&joinedDateTo=${joinedDateTo}`
 

         const config = {
            headers :{
                Authorization : `Bearer ${token}`
            }
         }
        
            const response = await axios.get(getAll_URL,config)
          
            return response.data
        }
     

    const setCourseToStudent  = async(myData,token)=>{
      const {studentId, coursesIds} = myData;
      const API_CourseStudentURL=`http://localhost:5000/api/v1/Student/${studentId}/courses`
    const config = {
       headers :{
           Authorization : `Bearer ${token}`,
       }     
    }
       const response = await axios.put(API_CourseStudentURL,coursesIds,config)
       return response.data
   }


//get Course By Id

       const getStudentDetails = async(studentId,token)=>{
        const config = {
           headers :{
               Authorization : `Bearer ${token}`
           }
        }
       
           const response = await axios.get(API_URL+studentId,config)
         
           return response.data
       }


   const deleteStudent = async(studentId,token)=>{
    const deleteStudent_URL=`http://localhost:5000/api/v1/Student/${studentId}`

    const config = {
       headers :{
           Authorization : `Bearer ${token}`
       }
    }
   
    const response = await axios.delete(deleteStudent_URL,config)
     
       return response.data
   }

      const studentService = {getStudents,deleteStudent,getStudentDetails,setCourseToStudent ,createStudent}

      export default studentService ;