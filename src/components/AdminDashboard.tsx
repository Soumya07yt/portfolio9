import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold">Portfolio Admin</h1>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <Home size={18} />
                <span>View Portfolio</span>
              </Link>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Dashboard Cards */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Profile Management</h3>
            <p className="text-gray-400 mb-4">Update your personal information and profile photo.</p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
              Manage Profile
            </button>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Skills & Technologies</h3>
            <p className="text-gray-400 mb-4">Add or update your technical skills and proficiency levels.</p>
            <button className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors">
              Manage Skills
            </button>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Projects</h3>
            <p className="text-gray-400 mb-4">Showcase your latest projects and work samples.</p>
            <button className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors">
              Manage Projects
            </button>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Experience</h3>
            <p className="text-gray-400 mb-4">Update your work experience and career timeline.</p>
            <button className="w-full bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg transition-colors">
              Manage Experience
            </button>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Achievements</h3>
            <p className="text-gray-400 mb-4">Add your awards, certifications, and accomplishments.</p>
            <button className="w-full bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg transition-colors">
              Manage Achievements
            </button>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Messages</h3>
            <p className="text-gray-400 mb-4">View and respond to contact form submissions.</p>
            <button className="w-full bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-lg transition-colors">
              View Messages
            </button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">12</div>
            <div className="text-gray-400">Total Projects</div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">8</div>
            <div className="text-gray-400">Skills Listed</div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">5</div>
            <div className="text-gray-400">Achievements</div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
            <div className="text-3xl font-bold text-pink-400 mb-2">23</div>
            <div className="text-gray-400">Messages</div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;