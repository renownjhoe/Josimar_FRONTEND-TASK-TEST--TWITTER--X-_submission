import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendOTP } from '../../services/twitterAPI';

export const generateOTP = createAsyncThunk(
  'otp/generateOTP',
  async (token, { rejectWithValue }) => {
    try {
      const otp = Math.floor(100000 + Math.random() * 900000);
      await sendOTP(token, otp);
      return otp;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const otpSlice = createSlice({
  name: 'otp',
  initialState: {
    code: null,
    isVerified: false,
    isLoading: false,
    error: null
  },
  reducers: {
    verifyOTP: (state, action) => {
      state.isVerified = state.code === action.payload;
    },
    resetOTP: (state) => {
      state.code = null;
      state.isVerified = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(generateOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.code = action.payload;
      })
      .addCase(generateOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { verifyOTP, resetOTP } = otpSlice.actions;
export default otpSlice.reducer;