import axios from 'axios'

const API_URL='http://localhost:5000/api/v1/session/'

//create Session
const createSession = async(sessionData ,token)=>{
    const API_URL=`http://localhost:5000/api/v1/session/${sessionData.courseId}`
    const config = {
       headers :{
           Authorization : `Bearer ${token}`
       }
    }
   
       const response = await axios.post(API_URL,sessionData,config)
       return response.data
   }



   // set course image 
   const uploadSessionFiles  = async({sessionId,formData},token)=>{
    const API_uploadSessionFilesURL=`http://localhost:5000/api/v1/File/AddSessionFile/${sessionId}`

    const config = {
       headers :{
           Authorization : `Bearer ${token}`,
           'content-type': 'multipart/form-data',
       }
    }
   
       const response = await axios.post(API_uploadSessionFilesURL,formData,config)
       return response.data
   }

   

      const getSessions = async(myData,token)=>{
        const {pageNumber, pageSize,sortOrder,searchString,sessionDate} = myData;
        const getAll_URL=`http://localhost:5000/api/v1/Session?PageNumber=${pageNumber}&PageSize=${pageSize}&sortOrder=${sortOrder}&searchString=${searchString}&sessionDate=${sessionDate}`
 

         const config = {
            headers :{
                Authorization : `Bearer ${token}`
            }
         }
        
            const response = await axios.get(getAll_URL,config)
          
            return response.data
        }
     
      const getSessionDetails = async(sessionId,token)=>{
        const config = {
           headers :{
               Authorization : `Bearer ${token}`
           }
        }
       
           const response = await axios.get(API_URL+sessionId,config)
         
           return response.data
       }
     

       const downloadSessionFile = async(myData,token)=>{  
        const {fileId , sessionId} = myData
        const downloadSessionFile_URL=`http://localhost:5000/api/v1/File/DownloadSessionFile/file:${fileId}/session:${sessionId}`

        const config = {
           headers :{
               Authorization : `Bearer ${token}`,
          
            },
            responseType: 'blob'
        }
       
          await axios.get(downloadSessionFile_URL,config)
        .then((response) => {
            var filename = response.headers.get('content-disposition').split(';')[1].trim().split('=')[1].replace(/"/g, '');
         const href = URL.createObjectURL(
          new Blob([response.data] , { type: response.headers.get('content-type') , encoding: 'UTF-8'})
          );
          const link = document.createElement("a");
          link.download = filename;
          link.href = href;
          link.click();
           URL.revokeObjectURL(href);
          })
         
      }




       
     































//     //   `${ENDPOINT.COURSE}?PageNumber=${CurrentPage}&PageSize=${pageSize}&sortOrder=${formvalue.sortBy}${formvalue.radio}&title=${formvalue.courseName}&level=${formvalue.level}&price=${formvalue.coursePrice}&startDate=${formvalue.startDate}&endDate=${formvalue.endDate}`:

//     const getCourses = async(myData,token)=>{
//        const {pageNumber, pageSize,sortOrder,title,level,price,startDate,endDate} = myData;
//       const getAll_URL=`http://localhost:5000/api/v1/Course??PageNumber=${pageNumber}&PageSize=${pageSize}&sortOrder=${sortOrder}&title=${title}&level=${level}&price=${price}&startDate=${startDate}&endDate=${endDate}`


//         const config = {
//            headers :{
//                Authorization : `Bearer ${token}`
//            }
//         }
       
//            const response = await axios.get(getAll_URL,config)
         
//            return response.data
//        }
    

// // Update Coures

       const updateSession = async(myData,token)=>{
           const {sessionId,sessionData} = myData
        const Update_URL=`http://localhost:5000/api/v1/Session/${sessionId}`

        const config = {
           headers :{
               Authorization : `Bearer ${token}`,

           }
        }
       
           const response = await axios.put(Update_URL,sessionData,config)
         
           return response.data
       }
    

// //get Course By Id

//        const getCourseById = async(courseId,token)=>{
//         const config = {
//            headers :{
//                Authorization : `Bearer ${token}`
//            }
//         }
       
//            const response = await axios.get(API_URL+courseId,config)
         
//            return response.data
//        }


//    // delete file
   const deleteFileFromSession = async(myData,token)=>{
    const {fileId , sessionId} = myData
    const deleteSessionFile_URL=`http://localhost:5000/api/v1/File/DeleteSessionFile/file:${fileId}/session:${sessionId}`

    const config = {
       headers :{
           Authorization : `Bearer ${token}`
       }
    }
   
    const response = await axios.delete(deleteSessionFile_URL,config)
     
       return response.data
   }



   const deleteSession = async(sessionId,token)=>{
    const deleteSession_URL=`http://localhost:5000/api/v1/Session/${sessionId}`

    const config = {
       headers :{
           Authorization : `Bearer ${token}`
       }
    }
   
    const response = await axios.delete(deleteSession_URL,config)
     
       return response.data
   }







//    const removeStudentFromCourse = async(myData,token)=>{
//     const {courseId,studentId} = myData
//  const removeStudentFromCourse_URL= `http://localhost:5000/api/v1/Course/${courseId}/removeItemFromCourse?studentId=${studentId}`


//  const config = {
//     headers :{
//         Authorization : `Bearer ${token}`,

//     }
//  }

//     const response = await axios.put(removeStudentFromCourse_URL,config)
  
//     return response.data
// }

      const sessionService = {createSession ,getSessions,getSessionDetails,uploadSessionFiles,downloadSessionFile,deleteFileFromSession,deleteSession,updateSession}

      export default sessionService ;