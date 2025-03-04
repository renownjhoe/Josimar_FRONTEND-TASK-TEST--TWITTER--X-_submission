import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isVerified } = useSelector((state) => state.otp);
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (!isVerified) {
    return <Navigate to="/otp" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;