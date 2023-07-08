import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { PURGE } from "redux-persist";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null, 
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
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
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(PURGE, () => {
        return initialState;
      });
  },
});

export const register = createAsyncThunk(
  "auth/regiter",
  async (user, thunkAPI) => {
    try {
      
      return await authService.register(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const signIn = createAsyncThunk("auth/signIn", async (user, thunkAPI) => {
  try {
    return await authService.signIn(user);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
}
);


export const { reset } = authSlice.actions;
export default authSlice.reducer;

