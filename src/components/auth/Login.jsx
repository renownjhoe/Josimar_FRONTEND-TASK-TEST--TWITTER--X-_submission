// src/components/auth/Login.jsx
import { TwitterIcon } from '../common/icons/TwitterIcon';
import { TwitterLogin } from 'react-twitter-auth';
import Button from '../common/Button';
import { REACT_APP_TWITTER_CLIENT_ID, REACT_APP_REDIRECT_URI } from '../../utils/constants';

const Login = () => {
  const handleLogin = () => {
    window.location.href = `https://x.com/i/oauth2/authorize?response_type=code&client_id=${REACT_APP_TWITTER_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URI}&scope=dm.write`;
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
          className="w-full group transition-all duration-200 hover:bg-blue-50"
        >
          <div className="flex items-center justify-center space-x-2">
            <TwitterIcon className="w-6 h-6 text-blue-500 group-hover:text-blue-600" />
            <span className="text-blue-600 group-hover:text-blue-700 font-medium">
              Continue with Twitter
            </span>
          </div>
        </Button>
        <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
          <p className="text-sm text-white">
            We'll send a 6-digit verification code to your Twitter DMs
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;