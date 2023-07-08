import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import teacherService from "./teacherSrevice";
import { PURGE } from "redux-persist";

const initialState = {
    teacherId:"",
    teachers : [],
    teacher : {} ,
    teacherImage:"",
    isError: false,
  isSuccess: false,
  isLoading: false,
  isDeleted:false,

  message: "",
  };
export const teacherSlice = createSlice ({
    name : "teacher" ,
    initialState , 
    reducers: {
         reset: (state) => {
        
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = false;
          state.isDeleted=false;
          state.message = "";
        },
      },
            extraReducers: (builder) => {
                builder
                .addCase(addTeacher.pending, (state) => {
                    state.isLoading = true;
                  })
                  .addCase(addTeacher.fulfilled, (state) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                  })
                  .addCase(addTeacher.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                     state.message = action.payload;
                  })
                  .addCase(getTeachers.pending, (state) => {
                    state.isLoading = true;
                  })
                  .addCase(getTeachers.fulfilled, (state,action) => {
                    state.isLoading = false;
                    state.teachers = action.payload;
                  })
                  .addCase(getTeachers.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                     state.message = action.payload;
                  })
                  .addCase(setTeacherToCourse.pending, (state) => {
                    state.isLoading = true;
                  })
                  .addCase(setTeacherToCourse.fulfilled, (state) => {
                    state.isLoading = false;
                    state.isSuccess = true;
            
                  })
                  .addCase(setTeacherToCourse.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                     state.message = action.payload;
                  })
                  .addCase(deleteTeacher.pending, (state) => {
                    state.isLoading = true;
                  })
                  .addCase(deleteTeacher.fulfilled, (state) => {
                    state.isLoading = false;
                     state.isDeleted = true;
                  })
                  .addCase(deleteTeacher.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                  })
                  .addCase(getTeacherById.pending, (state) => {
                    state.isLoading = true;
                  })
                  .addCase(getTeacherById.fulfilled, (state,action) => {
                    state.isLoading = false;
                    state.teacher = action.payload;
                  })
                  .addCase(getTeacherById.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                  }) 
                  .addCase(updateTeacher.pending, (state) => {
                    state.isLoading = true;
                  })
                  .addCase(updateTeacher.fulfilled, (state,action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                  })
                  .addCase(updateTeacher.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                  })
                  .addCase(PURGE, () => {
                    return initialState;
                  });
              },
           });
            

  export const addTeacher = createAsyncThunk(
    "teacher/add",
    async (teacherData, thunkAPI) => {
      try {
  ///      const token = thunkAPI.getState().auth.user.token;
        // return await teacherService.addTeacher(teacherData ,token);
        return await teacherService.addTeacher(teacherData );

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

  export const getTeachers = createAsyncThunk(
        "teachers/getAll",
        async (myData, thunkAPI) => {
          try {
            // const token = thunkAPI.getState().auth.user.token;
            // return await teacherService.getTeachers(myData,token);
            return await teacherService.getTeachers(myData);
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


      export const setTeacherToCourse = createAsyncThunk(
        "teacher/setCourse ",
        async (myData, thunkAPI) => {
          try {
            // const token = thunkAPI.getState().auth.user.token;
            // return await teacherService.setTeacherToCourse(myData,token);

            return await teacherService.setTeacherToCourse(myData);

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


      export const updateTeacher = createAsyncThunk(
        "teacher/update ",
        async (myData, thunkAPI) => {
          try {
            // const token = thunkAPI.getState().auth.user.token;
            // return await teacherService.updateTeacher(myData,token);
            return await teacherService.updateTeacher(myData);
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
      
      
  export const deleteTeacher = createAsyncThunk(
    "teacher/delete ",
    async (teacherId, thunkAPI) => {
      try {
        // const token = thunkAPI.getState().auth.user.token;
        // return await teacherService.deleteTeacher(teacherId,token);
        return await teacherService.deleteTeacher(teacherId);
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


export const getTeacherById = createAsyncThunk(
  "teacher/getById ",
  async (teacherId, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token;
      // return await teacherService.getTeacherById(teacherId,token);

      return await teacherService.getTeacherById(teacherId);
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
  export const { reset } = teacherSlice.actions;
  export default teacherSlice.reducer;
  