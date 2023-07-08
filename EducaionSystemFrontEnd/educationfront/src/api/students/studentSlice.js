import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import studentService from "./studentService";
import { PURGE } from "redux-persist";

const initialState = {
  studentId:"",
  students : [],
  student : {} ,
    isError: false,
    isSuccess: false,
  isLoading: false,
  message: "",
  };
export const studentSlice = createSlice ({
    name : "student" ,
    initialState , 
    reducers: {
         reset: (state) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = false;
          state.message = "";
        },
      },
            extraReducers: (builder) => {
                builder
              
                  .addCase(getStudents.pending, (state) => {
                    state.isLoading = true;
                  })
                  .addCase(getStudents.fulfilled, (state,action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.students = action.payload;
                  })
                  .addCase(getStudents.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                     state.message = action.payload;
                  }) 
                  .addCase(createStudent.pending, (state) => {
                    state.isLoading = true;
                  })
                  .addCase(createStudent.fulfilled, (state,action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.student = action.payload;
                  })
                  .addCase(createStudent.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                     state.message = action.payload;
                  })
                  .addCase(deleteStudent.pending, (state) => {
                    state.isLoading = true;
                  })
                  .addCase(deleteStudent.fulfilled, (state,action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                  })
                  .addCase(deleteStudent.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                     state.message = action.payload;
                  })
                  .addCase(getStudentDetails.pending, (state) => {
                    state.isLoading = true;
                  })
                  .addCase(getStudentDetails.fulfilled, (state,action) => {
                    state.isLoading = false;
                    state.student = action.payload;
                  })
                  
                  .addCase(getStudentDetails.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                  }) 
                  .addCase(setStudentToCourse.pending, (state) => {
                    state.isLoading = true;
                  })
                  .addCase(setStudentToCourse.fulfilled, (state) => {
                    state.isLoading = false;
                    state.isSuccess = true;
            
                  })
                  .addCase(setStudentToCourse.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                     state.message = action.payload;
                  })
                  .addCase(PURGE, () => {
                    return initialState;
                  });
              },
           });
           

  export const createStudent = createAsyncThunk(
    "student/create",
    async (studentData, thunkAPI) => {
      try {
  ///      const token = thunkAPI.getState().auth.user.token;
        // return await studentService.createStudent(studentData ,token);
        return await studentService.createStudent(studentData );

      } catch (error) {
        var message = "";
        if (error.response.data.error) {
          message = error.response.data.error;
        } else if (error.response.data.errors) {
          message = "User Name must be with a minimum length of '6'." ;
        } else if (error.response.data.errors) {
          message ="Passwords must have at least one non alphanumeric character, Passwords must have at least one digit (0-9), Passwords must have at least one uppercase (A-Z)";
        }
  
        return thunkAPI.rejectWithValue(message);
      }
    }
  );



  export const getStudents = createAsyncThunk(
    "student/getAll",
    async (myData, thunkAPI) => {
      try {
        // const token = thunkAPI.getState().auth.user.token;
        // return await studentService.getStudents(token);
        return await studentService.getStudents(myData);

      } catch (error) {
        var message = "";
        if (error.response.data.error) {
          message = error.response.data.error;
        } else if (error.response.data.errors) {
          message = "User Name must be with a minimum length of '6'." ;
        } else if (error.response.data.errors) {
          message ="Passwords must have at least one non alphanumeric character, Passwords must have at least one digit (0-9), Passwords must have at least one uppercase (A-Z)";
        }
  
        return thunkAPI.rejectWithValue(message);
      }
    }
  );




  export const getStudentDetails = createAsyncThunk(
    "student/getById ",
    async (studentId, thunkAPI) => {
      try {
        // const token = thunkAPI.getState().auth.user.token;
        // return await studentService.getStudentDetails(studentId,token);
  
        return await studentService.getStudentDetails(studentId);
      } catch (error) {
        var message = "";
        if (error.response.data.error) {
          message = error.response.data.error;
        } else if (error.response.data.errors) {
          message ="Sorry there is something wrong"
        } else if (error.response.data.errors) {
          message ="Sorry there is something wrong"
        }
  
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  

export const setStudentToCourse = createAsyncThunk(
  "student/setCourse ",
  async (myData, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token;
      // return await studentService.setCourseToStudent(myData,token);

      return await studentService.setCourseToStudent(myData);

    } catch (error) {
      var message = "";
      if (error.response.data.error) {
        message = error.response.data.error;
      } else if (error.response.data.errors) {
        message ="Sorry there is something wrong"
      } else if (error.response.data.errors) {
        message ="Sorry there is something wrong"
      }

      return thunkAPI.rejectWithValue(message);
    }
  }
);

  

  export const deleteStudent = createAsyncThunk(
    "student/deleteStudent ",
    async (studentId, thunkAPI) => {
      try {
        // const token = thunkAPI.getState().auth.user.token;
        // return await studentService.deleteStudent(courseId,token);
        return await studentService.deleteStudent(studentId);
      } catch (error) {
        var message = "";
        if (error.response.data.error) {
          message = error.response.data.error;
        } else if (error.response.data.errors) {
          message ="Sorry there is something wrong"
        } else if (error.response.data.errors) {
          message ="Sorry there is something wrong"
        }
  
        return thunkAPI.rejectWithValue(message);
      }
    }
  );


  export const { reset } = studentSlice.actions;
  export default studentSlice.reducer;