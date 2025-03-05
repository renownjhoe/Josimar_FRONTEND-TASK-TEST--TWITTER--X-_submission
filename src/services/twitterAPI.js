// src/services/twitterAPI.js
import CryptoJS from 'crypto-js';

export const generateRandomString = (length) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

export const generateCodeChallenge = async (codeVerifier) => {
    const hash = CryptoJS.SHA256(codeVerifier);
    const base64Digest = CryptoJS.enc.Base64.stringify(hash);
    return base64Digest
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
};

export const sendOTP = async (token, otp) => {
  return true;
  // return axios.post(
  //   `${REACT_APP_BASE_API}/dm`,
  //   { otp },
  //   { headers: { Authorization: `Bearer ${token}` } }
  // );
};

// Remove exchangeCodeForToken and sendOTP. They are no longer needed here.