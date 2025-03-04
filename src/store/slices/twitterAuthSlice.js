// store/slices/twitterAuthSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const twitterLogin = createAsyncThunk(
  'twitterAuth/login',
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        method: 'post',
        url: 'https://api.twitter.com/oauth/request_token',
        params: {
          oauth_consumer_key: 'f4JA50JKgveUUtfWzkUZEY2pW',
          oauth_token: '1453289064-KOKNwujNKOHE2f6K1pM6WdSnvxXDTwRule6TXUH',
          oauth_signature_method: 'HMAC-SHA1',
          oauth_timestamp: Math.floor(Date.now() / 1000),
          oauth_nonce: Math.random().toString(36).substring(7),
          oauth_version: '2.0'
        },
        headers: {
          Cookie: '_twitter_sess=...' // Truncated for example
        }
      };

      const response = await axios(config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const twitterAuthSlice = createSlice({
  name: 'twitterAuth',
  initialState: {
    token: null,
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(twitterLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(twitterLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
      })
      .addCase(twitterLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export default twitterAuthSlice.reducer;