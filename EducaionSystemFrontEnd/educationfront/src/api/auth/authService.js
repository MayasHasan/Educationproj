import axios from 'axios'

const API_URL='http://localhost:5000/api/v1/Authentication/'


// Register user 

const register = async(userData)=>{
    const API_URL='http://localhost:5000/api/v1/Student/'

    const response = await axios.post(API_URL ,userData)
   
    return response.data
}



//sign in
  const signIn = async(userData)=>{
    const response = await axios.post(API_URL+'SignIn',userData)
    return response.data
}




const authService = {register ,signIn}





export default authService ;