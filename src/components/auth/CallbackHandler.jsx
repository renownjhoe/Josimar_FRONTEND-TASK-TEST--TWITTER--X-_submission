// src/components/auth/CallbackHandler.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { accessToken } from '../../store/slices/authSlice';
import { generateOTP } from '../../store/slices/otpSlice';
import Loader from '../common/Loader';

const CallbackHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, isLoading: authLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleAuthCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const oauth_token = urlParams.get('oauth_token');
      const oauth_verifier = urlParams.get('oauth_verifier');
    
      if (!oauth_token || !oauth_verifier) {
        
        navigate('/?error=missing_parameters');
        return;
      }
    
      try {
        await dispatch(accessToken({ oauth_token, oauth_verifier })).unwrap();
        if (token) {
          await dispatch(generateOTP()).unwrap();
          navigate('/otp');
        }
      } catch (error) {
        console.error('Authentication failed:', error);
        navigate('/?error=authentication_failed&message=' + encodeURIComponent(error.message || 'Unknown error'));
      }
    };

    handleAuthCallback();
  }, [dispatch, navigate, token]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-3">
      <div className="text-center space-y-4">
        <Loader className="w-12 h-12 mx-auto text-blue-500" />
        <p className="text-gray-600 font-medium">
          {authLoading ? 'Authenticating...' : 'Generating OTP...'}
        </p>
        <p className="text-sm text-gray-500">
          Please wait while we process your request
        </p>
      </div>
    </div>
  );
};

export default CallbackHandler;