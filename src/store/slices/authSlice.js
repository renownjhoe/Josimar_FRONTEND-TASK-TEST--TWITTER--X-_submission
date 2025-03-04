import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { exchangeCodeForToken } from '../../services/twitterAPI';

export const twitterLogin = createAsyncThunk(
  'auth/twitterLogin',
  async (code, { rejectWithValue }) => {
    try {
      const response = await exchangeCodeForToken(code);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isLoading: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(twitterLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(twitterLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.access_token;
      })
      .addCase(twitterLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

export const twitterLoginSuccess = createAction('auth/twitterLoginSuccess', (userData) => ({
  payload: {
    user: userData.user,
    token: userData.accessToken,
    isAuthenticated: true
  }
}));

export const twitterLoginFailure = createAction('auth/twitterLoginFailure', (error) => ({
  payload: error
}));