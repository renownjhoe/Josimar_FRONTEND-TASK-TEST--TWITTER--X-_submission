// src/components/auth/Login.jsx
import { useDispatch, useSelector } from 'react-redux';
import { TwitterIcon } from '../common/icons/TwitterIcon';
import { requestToken } from '../../store/slices/authSlice';
import Button from '../common/Button';
import Loader from '../common/Loader';
import { AUTHORIZE_URL } from '../../utils/constants';
import { useState } from 'react';

const Login = () => {
  const dispatch = useDispatch();
  const { isLoading, error, oauthToken } = useSelector((state) => state.auth);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async () => {
    try {
      const result = await dispatch(requestToken()).unwrap();
      if (result.oauth_token) {
        window.location.href = `${AUTHORIZE_URL}?oauth_token=${result.oauth_token}`;
      }
    } catch (err) {
      console.error('Failed to initiate login:', err);
      setErrorMessage(err.message || 'Failed to initiate login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-8 transition-all duration-300 hover:shadow-3xl">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-blue-600">StanbicX</h1>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-gray-800">Welcome Back</h2>
            <p className="text-gray-600">Secure login with Twitter</p>
          </div>
        </div>

        <Button 
          onClick={handleLogin} 
          disabled={isLoading}
          className="w-full group transition-all duration-200 hover:bg-blue-50"
        >
          <div className="flex items-center justify-center space-x-2">
            {isLoading ? (
              <Loader className="w-6 h-6 text-blue-500" />
            ) : (
              <>
                <TwitterIcon className="w-6 h-6 text-blue-500 group-hover:text-blue-600" />
                <span className="text-blue-600 group-hover:text-blue-700 font-medium">
                  Continue with Twitter
                </span>
              </>
            )}
          </div>
        </Button>

        {errorMessage && (
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-red-600">{errorMessage}</p>
          </div>
        )}

        <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
          <p className="text-sm text-black">
            We'll send a 6-digit verification code to your Twitter DMs
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;