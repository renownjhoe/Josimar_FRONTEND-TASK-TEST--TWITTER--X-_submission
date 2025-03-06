// src/store/slices/otpSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {BACKEND_API_URL} from '../../utils/constants';

// Generate and send OTP via DM
export const generateOTP = createAsyncThunk(
  'otp/generateOTP',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken = state.auth.token;
      const accessTokenSecret = state.auth.tokenSecret;
      const userId = state.auth.user.user_id;

      if (!accessToken || !accessTokenSecret || !userId) {
        throw new Error('Missing authentication details');
      }

      // Generate a 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      // Send the OTP via backend endpoint
      await axios.post(`${BACKEND_API_URL}/send-dm`, {
        access_token: accessToken,
        access_token_secret: accessTokenSecret,
        user_id: userId,
        message: `Your verification code is: ${otp}`,
      });

      return otp;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const otpSlice = createSlice({
  name: 'otp',
  initialState: {
    otp: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearOTP: (state) => {
      state.otp = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(generateOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.otp = action.payload;
      })
      .addCase(generateOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOTP } = otpSlice.actions;
export default otpSlice.reducer;