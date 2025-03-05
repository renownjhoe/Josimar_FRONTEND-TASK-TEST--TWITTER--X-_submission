// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Backend API base URL (adjust if deployed)
const BACKEND_API_URL = 'http://localhost:3001';

// Step 1: Request a temporary token via backend
export const requestToken = createAsyncThunk(
  'auth/requestToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BACKEND_API_URL}/request-token`);
      return response.data; // { oauth_token, oauth_token_secret }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Step 3: Exchange the authorized token for an access token via backend
export const accessToken = createAsyncThunk(
  'auth/accessToken',
  async ({ oauth_token, oauth_verifier }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BACKEND_API_URL}/access-token`, {
        oauth_token,
        oauth_verifier,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    tokenSecret: null,
    isLoading: false,
    error: null,
    oauthToken: null,
    oauthTokenSecret: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.tokenSecret = null;
      state.oauthToken = null;
      state.oauthTokenSecret = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.oauthToken = action.payload.oauth_token;
        state.oauthTokenSecret = action.payload.oauth_token_secret;
      })
      .addCase(requestToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(accessToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(accessToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.access_token;
        state.tokenSecret = action.payload.access_token_secret;
        state.user = {
          user_id: action.payload.user_id,
          screen_name: action.payload.screen_name,
        };
      })
      .addCase(accessToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;