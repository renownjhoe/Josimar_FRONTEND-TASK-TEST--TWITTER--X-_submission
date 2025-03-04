import axios from 'axios';
import { REACT_APP_TWITTER_CLIENT_ID, REACT_APP_REDIRECT_URI, REACT_APP_BASE_API } from '../utils/constants';

export const exchangeCodeForToken = async (code) => {
  return axios.post(`${REACT_APP_BASE_API}/auth/twitter`, {
    code,
    client_id: REACT_APP_TWITTER_CLIENT_ID,
    redirect_uri: REACT_APP_REDIRECT_URI
  });
};

export const sendOTP = async (token, otp) => {
  return axios.post(
    `${REACT_APP_BASE_API}/dm`,
    { otp },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};