import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { twitterLogin } from '../../store/slices/authSlice';
import { generateOTP } from '../../store/slices/otpSlice';
import Loader from '../common/Loader';

const CallbackHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, isLoading: authLoading } = useSelector((state) => state.auth);
//   const { isLoading: otpLoading } = useSelector((state) => state.otp);

  useEffect(() => {
    const handleAuthCallback = async () => {
      const code = new URLSearchParams(window.location.search).get('code');
      
      if (!code) {
        navigate('/');
        return;
      }

      try {
        // Exchange code for Twitter access token
        dispatch(twitterLogin(code));
      } catch (error) {
        console.error('Authentication failed:', error);
        navigate('/');
      }
    };

    handleAuthCallback();
  }, [dispatch, navigate]);

  useEffect(() => {
    if (token && !authLoading) {
      dispatch(generateOTP(token))
        .unwrap()
        .then(() => navigate('/otp'))
        .catch(() => navigate('/'));
    }
  }, [token, authLoading, dispatch, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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