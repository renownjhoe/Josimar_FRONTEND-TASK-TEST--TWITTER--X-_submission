import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateOTP } from '../../store/slices/otpSlice';
import Button from '../common/Button';
import Loader from '../common/Loader';

const OTPVerification = () => {
  const [code, setCode] = useState('');
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.otp);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(generateOTP(code));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Enter Verification Code</h1>
          <p className="text-gray-500">Check your Twitter DMs for the 6-digit code</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="number"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter 6-digit code"
              maxLength="6"
              required
            />
          </div>
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader /> : 'Verify Code'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;