import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import courseService from "./courseService"; 
import { PURGE } from "redux-persist";

const initialState = {
  courseId:"",
   courses : [],
   course : {} ,
   courseImage:null,
    isError: false,
  isSuccess: false,
  isLoading: false,
  isDeleted:false,
  message: "",
  };
export const courseSlice = createSlice ({
    name : "course" ,
    initialState , 
    reducers: {
         reset: (state) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = false;
          state.isDeleted=false;
          state.message = "";
        },
        resetImage: (state) => {
          state.courseImage="";
        },
      },
            extraReducers: (builder) => {
                builder
                .addCase(createCourse.pending, (state) => {
                    state.isLoading = true;
                  })
                  .addCase(createCourse.fulfilled, (state,action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.courseId = action.payload;
                  })
                  .addCase(createCourse.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                     state.message = action.payload;
                  })
                  .addCase(setCourseProfileImg.pending, (state) => {
                    state.isLoading = true;
                  })
                  .addCase(setCourseProfileImg.fulfilled, (state,action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.courseImage = action.payload;
                  })
                  .addCase(setCourseProfileImg.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                     state.message = action.payload;
                  })
                  .addCase(getCourseProfileImg.pending, (state) => {
                    state.isLoading = true;
                  })
                  .addCase(getCourseProfileImg.fulfilled, (state,action) => {
                    state.isLoading = false;
                    state.courseImage = action.payload;
                  })
                  .addCase(getCourseProfileImg.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                     state.message = action.payload;
                  })
                  .addCase(getCourses.pending, (state) => {
                    state.isLoading = true;
                  })
                  .addCase(getCourses.fulfilled, (state,action) => {
                    state.isLoading = false;
                    state.courses = action.payload;
                  })
                  .addCase(getCourses.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                     state.message = action.payload;
                  }) 
                  .addCase(getcourse.pending, (state) => {
                    state.isLoading = true;
                  })
                  .addCase(getcourse.fulfilled, (state,action) => {
                    state.isLoading = false;
                    state.course = action.payload;
                  })
                  .addCase(getcourse.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                  }) 
                   .addCase(updateCourse.pending, (state) => {
                    state.isLoading = true;
                  })
                  .addCase(updateCourse.fulfilled, (state,action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                     state.course = action.payload;
                  })
                  .addCase(updateCourse.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                  })
                  .addCase(deleteCourse.pending, (state) => {
                    state.isLoading = true;
                  })
                  .addCase(deleteCourse.fulfilled, (state) => {
                    state.isLoading = false;
                     state.isDeleted = true;
                  })
                  .addCase(deleteCourse.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                  })
                  .addCase(removeStudentFromCourse.pending, (state) => {
                    state.isLoading = true;
                  })
                  .addCase(removeStudentFromCourse.fulfilled, (state,action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                  })
                  .addCase(removeStudentFromCourse.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                  })
                  .addCase(PURGE, () => {
                    return initialState;
                  });
              },
           });
            

  export const createCourse = createAsyncThunk(
    "course/create",
    async (courseData, thunkAPI) => {
      try {
  ///      const token = thunkAPI.getState().auth.user.token;
        // return await courseService.createCourse(courseData ,token);
        return await courseService.createCourse(courseData );

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


  
  export const setCourseProfileImg = createAsyncThunk(
    "course/profileImage",
    async ({courseId ,formData}, thunkAPI) => {
      try {
  ///      const token = thunkAPI.getState().auth.user.token;
        // return await courseService.setCourseProfileImg(courseData ,token);
        
        return await courseService.setCourseProfileImg({courseId,formData});

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

  export const getCourseProfileImg = createAsyncThunk(
    "course/getProfileImage",
    async (courseId, thunkAPI) => {
      try {
  ///      const token = thunkAPI.getState().auth.user.token;
        // return await createCourse.createCategiry(courseData ,token);
        
        return await courseService.getCourseProfileImg(courseId);

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

  export const getCourses = createAsyncThunk(
    "course/getAll",
    async (myData, thunkAPI) => {
      try {
        // const token = thunkAPI.getState().auth.user.token;
        // return await courseService.getCourses(token);
        return await courseService.getCourses(myData);

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


  
  export const updateCourse = createAsyncThunk(
    "course/update ",
    async (myData, thunkAPI) => {
      try {
        // const token = thunkAPI.getState().auth.user.token;
        // return await courseService.updatCourse(courseData,token);
        return await courseService.updateCourse(myData);
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
  
  export const getcourse = createAsyncThunk(
    "course/getById ",
    async (courseId, thunkAPI) => {
      try {
        // const token = thunkAPI.getState().auth.user.token;
        // return await courseService.getCourseById(courseId,token);

        return await courseService.getCourseById(courseId);
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


  export const deleteCourse = createAsyncThunk(
    "course/delete ",
    async (courseId, thunkAPI) => {
      try {
        // const token = thunkAPI.getState().auth.user.token;
        // return await courseService.deleteCourse(courseId,token);
        return await courseService.deleteCourse(courseId);
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



  export const removeStudentFromCourse = createAsyncThunk(
    "course/removeStudentFromCourse ",
    async (myData, thunkAPI) => {
      
      try {
        // const token = thunkAPI.getState().auth.user.token;
        // return await courseService.removeStudentFromCourse(courseId,token);
        return await courseService.removeStudentFromCourse(myData);
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

  export const { reset, resetImage } = courseSlice.actions;
  export default courseSlice.reducer;
  