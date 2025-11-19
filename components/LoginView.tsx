import React, { useState } from 'react';
import Button from './ui/Button';
import { UserIcon, LockIcon } from './icons/IconComponents';

interface LoginViewProps {
  onLogin: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - typically this would call an API
    if (username === 'admin' && password === 'admin') {
      setError('');
      onLogin();
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bc-gray dark:bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
          <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="#006A4E" />
          </svg>
      </div>
      
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md z-10 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 mx-4 animate-slide-up">
        <div className="flex flex-col items-center mb-8">
           <div className="w-full flex justify-center mb-4">
                <img src="https://www.bc.com/wp-content/uploads/2021/04/Boise-Cascade-Primary-Logo-Color-2048x443.png" alt="Boise Cascade" className="h-12 object-contain dark:hidden" />
                <img src="https://www.bc.com/wp-content/uploads/2021/04/Boise-Cascade-Primary-Logo-White-2048x443.png" alt="Boise Cascade" className="h-12 object-contain hidden dark:block" />
           </div>
           <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Admin Portal</h2>
           <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Enter your credentials to access the dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-bc-green focus:border-bc-green sm:text-sm p-2.5 border dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-colors"
                placeholder="Enter username"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-bc-green focus:border-bc-green sm:text-sm p-2.5 border dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/30 dark:border-red-800 animate-fade-in">
                 <p className="text-red-600 text-sm text-center dark:text-red-300">{error}</p>
            </div>
          )}

          <Button type="submit" className="w-full justify-center py-3 text-lg shadow-lg hover:shadow-xl transform transition-all active:scale-[0.98]">
            Sign In
          </Button>
        </form>
        
        <div className="mt-6 text-center">
             <p className="text-xs text-gray-400 dark:text-gray-500">Demo Access: admin / admin</p>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
