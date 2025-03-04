import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name}
            </h1>
            <p className="text-gray-500">
              You have successfully authenticated via Twitter
            </p>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Add dashboard metrics here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;