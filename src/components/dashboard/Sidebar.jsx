import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { 
  ChartBarIcon,
  DocumentTextIcon,
  CogIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 shadow-lg flex flex-col">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-blue-600">StanbicX</h2>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => 
            `flex items-center space-x-3 p-3 rounded-lg transition-colors
            ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`
          }
        >
          <ChartBarIcon className="w-5 h-5" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/dashboard/reports"
          className={({ isActive }) => 
            `flex items-center space-x-3 p-3 rounded-lg transition-colors
            ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`
          }
        >
          <DocumentTextIcon className="w-5 h-5" />
          <span>Reports</span>
        </NavLink>

        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) => 
            `flex items-center space-x-3 p-3 rounded-lg transition-colors
            ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`
          }
        >
          <CogIcon className="w-5 h-5" />
          <span>Settings</span>
        </NavLink>
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;