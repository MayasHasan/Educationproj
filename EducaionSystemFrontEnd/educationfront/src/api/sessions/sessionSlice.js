import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sessionService from "./sessionService";
import { PURGE } from "redux-persist";

const initialState = {
  sessionId:"",
   sessions : [],
   session : {} ,
   isUpladFileSuccess:false,
    isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  };
export const sessionSlice = createSlice ({
    name : "session" ,
    initialState , 
    reducers: {
         reset: (state) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = false;
          state.isUpladFileSuccess = false;
          state.message = "";
        },
      },
            extraReducers: (builder) => {
                builder
                .addCase(createSession.pending, (state) => {
                    state.isLoading = true;
                  })
                  .addCase(createSession.fulfilled, (state,action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.sessionId = action.payload;
                  })
                  .addCase(createSession.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                     state.message = action.payload;
                  })
                  .addCase(getSessions.pending, (state) => {
                    state.isLoading = true;
                  })
                  .addCase(getSessions.fulfilled, (state,action) => {
                    state.isLoading = false;
                    state.sessions = action.payload;
                  })
                  .addCase(getSessions.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                     state.message = action.payload;
                  }) 
                  .addCase(getSessionDetails.pending, (state) => {
                    state.isLoading = true;
                  })
                  .addCase(getSessionDetails.fulfilled, (state,action) => {
                    state.isLoading = false;
                    state.session = action.payload;
                  })
                  .addCase(getSessionDetails.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                  }) 
                  .addCase(uploadSessionFiles.pending, (state) => {
                    state.isLoading = true;
                  })
                  .addCase(uploadSessionFiles.fulfilled, (state,action) => {
                    state.isLoading = false;
                    state.isUpladFileSuccess = true;
                  })
                  .addCase(uploadSessionFiles.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                     state.message = action.payload;
                  })
                  .addCase(downloadSessionFile.pending, (state) => {
                    state.isLoading = true;
                  })
                  .addCase(downloadSessionFile.fulfilled, (state,action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                  })
                  .addCase(downloadSessionFile.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                     state.message = action.payload;
                  })
                  .addCase(deleteFileFromSession.pending, (state) => {
                    state.isLoading = true;
                  })
                  .addCase(deleteFileFromSession.fulfilled, (state,action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                  })
                  .addCase(deleteFileFromSession.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                     state.message = action.payload;
                  })
                  .addCase(deleteSession.pending, (state) => {
                    state.isLoading = true;
                  })
                  .addCase(deleteSession.fulfilled, (state,action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                  })
                  .addCase(deleteSession.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                     state.message = action.payload;
                  })
                  .addCase(updateSession.pending, (state) => {
                    state.isLoading = true;
                  })
                  .addCase(updateSession.fulfilled, (state) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                  })
                  .addCase(updateSession.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                     state.message = action.payload;
                  })
                  .addCase(PURGE, () => {
                    return initialState;
                  });
              },
           });
           
           
  export const createSession = createAsyncThunk(
    "session/create",
    async (sessionData, thunkAPI) => {
      try {
  ///      const token = thunkAPI.getState().auth.user.token;
        // return await sessionService.createSession(sessionData ,token);
        return await sessionService.createSession(sessionData );

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


  
  export const uploadSessionFiles = createAsyncThunk(
    "session/uploadFiles",
    async ({sessionId ,formData}, thunkAPI) => {
      try {
  ///      const token = thunkAPI.getState().auth.user.token;
        // return await createCourse.createCategiry(courseData ,token);
        
        return await sessionService.uploadSessionFiles({sessionId,formData});

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


  export const getSessions = createAsyncThunk(
    "session/getAll",
    async (myData, thunkAPI) => {
      try {
        // const token = thunkAPI.getState().auth.user.token;
        // return await sessionService.getSessions(myData,token);
        return await sessionService.getSessions(myData);

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




  export const getSessionDetails = createAsyncThunk(
    "session/getById ",
    async (sessionId, thunkAPI) => {
      try {
        // const token = thunkAPI.getState().auth.user.token;
        // return await courseService.getCourseById(courseId,token);
  
        return await sessionService.getSessionDetails(sessionId);
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
  
  export const downloadSessionFile = createAsyncThunk(
    "session/downloadSessionFile ",
    async (myData, thunkAPI) => {
      try {
        // const token = thunkAPI.getState().auth.user.token;
        // return await sessionService.downloadSessionFile(myData,token);
  
        return await sessionService.downloadSessionFile(myData);
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
  
  
  
  
  

  
  export const updateSession = createAsyncThunk(
    "session/update ",
    async (myData, thunkAPI) => {
      try {
        // const token = thunkAPI.getState().auth.user.token;
        // return await sessionService.updateSession(myData,token);
        return await sessionService.updateSession(myData);
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
  

  export const deleteFileFromSession = createAsyncThunk(
    "session/deleteFileFromSession ",
    async (myData, thunkAPI) => {
      try {
        // const token = thunkAPI.getState().auth.user.token;
        // return await sessionService.deleteFileFromSession(myData,token);
        return await sessionService.deleteFileFromSession(myData);
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

  export const deleteSession = createAsyncThunk(
    "session/deleteSession ",
    async (sessionId, thunkAPI) => {
      try {
        // const token = thunkAPI.getState().auth.user.token;
        // return await sessionService.deleteSession(sessionId,token);
        return await sessionService.deleteSession(sessionId);
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

  export const { reset } = sessionSlice.actions;
  export default sessionSlice.reducer;
  