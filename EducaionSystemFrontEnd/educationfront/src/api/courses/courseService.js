import axios from 'axios'

const API_URL='http://localhost:5000/api/v1/Course/'

//creat coures
const createCourse = async(courseData ,token)=>{
    const config = {
       headers :{
           Authorization : `Bearer ${token}`
       }
    }
   
       const response = await axios.post(API_URL,courseData,config)
       return response.data
   }



   // set course image 
   const setCourseProfileImg  = async({courseId,formData},token)=>{
    const API_IMAGEURL=`http://localhost:5000/api/v1/File/AddCourseFile/${courseId}?isProfile=true`

    const config = {
       headers :{
           Authorization : `Bearer ${token}`,
           'content-type': 'multipart/form-data',
       }
    }
   
       const response = await axios.post(API_IMAGEURL,formData,config)
       return response.data
   }

   
   const getCourseProfileImg  = async(courseId,token)=>{
    const API_IMAGEURL=`http://localhost:5000/api/v1/File/GetCourseFile/${courseId}?isProfile=true`

    const config = {
       headers :{
           Authorization : `Bearer ${token}`,
           'content-type': 'multipart/form-data',
       }
    }
   
       const response = await axios.get(API_IMAGEURL,config)
       return response.data
   }


    const getCourses = async(myData,token)=>{
       const {pageNumber, pageSize,sortOrder,title,level,price,startDate,endDate} = myData;
      const getAll_URL=`http://localhost:5000/api/v1/Course?PageNumber=${pageNumber}&PageSize=${pageSize}&sortOrder=${sortOrder}&title=${title}&level=${level}&price=${price}&startDate=${startDate}&endDate=${endDate}`


        const config = {
           headers :{
               Authorization : `Bearer ${token}`
           }
        }
       
           const response = await axios.get(getAll_URL,config)
         
           return response.data
       }
    

// Update Coures

       const updateCourse = async(myData,token)=>{
           const {courseId,courseData} = myData
        const Udate_URL=`http://localhost:5000/api/v1/Course/${courseId}`

        const config = {
           headers :{
               Authorization : `Bearer ${token}`,

           }
        }
       
           const response = await axios.put(Udate_URL,courseData,config)
         
           return response.data
       }
    

//get Course By Id

       const getCourseById = async(courseId,token)=>{
        const config = {
           headers :{
               Authorization : `Bearer ${token}`
           }
        }
       
           const response = await axios.get(API_URL+courseId,config)
         
           return response.data
       }


   // delete event
   const deleteCourse = async(courseId,token)=>{
    const config = {
       headers :{
           Authorization : `Bearer ${token}`
       }
    }
   
    const response = await axios.delete(API_URL+courseId,config)
     
       return response.data
   }

   const removeStudentFromCourse = async(myData,token)=>{
    const {courseId,studentId} = myData
 const removeStudentFromCourse_URL= `http://localhost:5000/api/v1/Course/${courseId}/removeItemFromCourse?studentId=${studentId}`


 const config = {
    headers :{
        Authorization : `Bearer ${token}`,

    }
 }

    const response = await axios.put(removeStudentFromCourse_URL,config)
  
    return response.data
}

      const courseService = {createCourse , setCourseProfileImg ,getCourseProfileImg,getCourses,updateCourse,getCourseById,deleteCourse , removeStudentFromCourse}

      export default courseService ;