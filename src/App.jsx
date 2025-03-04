import { store } from './store/store';
import { Provider } from 'react-redux';
import Login from './components/auth/Login';
import OTPVerification from './components/auth/OTPVerification';
import Dashboard from './components/dashboard/Dashboard';
import CallbackHandler from './components/auth/CallbackHandler';
import ProtectedRoute from './components/common/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

const App = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/callback" element={<CallbackHandler />} />
        <Route path="/otp" element={<OTPVerification />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  </Provider>
);

export default App;
