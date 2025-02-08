import axios from 'axios';
import { useState } from 'react';
import { useUser } from '../hooks/useUser';
import { IUser } from '../context/userContext';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();

  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/create-user`, {
        username: username.trim(),
      });
      console.log(response.data);
      setUser(response.data as IUser);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 text-center bg-white shadow-xl rounded-2xl w-[400px]">
        <h1 className="text-3xl font-bold text-blue-600">Login</h1>
        <input
          type="text"
          placeholder="Enter User or Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 mt-4 border rounded-lg"
        />
        <button
          onClick={handleLogin}
          className="w-full px-6 py-3 mt-4 text-lg font-bold text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default Login;
