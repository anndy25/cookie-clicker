import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useUser } from '../hooks/useUser';
import { debounce } from 'lodash';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CookieCard = () => {
  const [counter, setCounter] = useState(0);
  const [rewards, setRewards] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const { userInfo, removeUser } = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/user/${userInfo?.userId}`);
        setCounter(res.data.counter);
        setRewards(res.data.rewards);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []);

  const handleClick = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/increment`, {
        userId: userInfo?.userId,
      });
      setCounter(res.data.counter);

      if (res.data.rewards > rewards) {
        setFeedback('🎉 You got a reward!');
      } else {
        setFeedback('');
      }

      setRewards(res.data.rewards);
    } catch (error) {
      console.error('Error incrementing counter:', error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedHandleClick = useCallback(debounce(handleClick, 50), [
    loading,
  ]);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      {/* Logout Button & Username */}
      <div className="absolute flex items-center gap-3 top-5 right-5">
        <span className="text-lg font-semibold text-gray-700">
          {userInfo?.username}
        </span>
        <button
          onClick={removeUser}
          className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Main Card */}
      <div className="p-8 text-center bg-white shadow-xl rounded-2xl w-[400px] h-[350px] flex flex-col justify-between">
        <h1 className="text-3xl font-bold text-blue-600">
          Cookie Clicker Game
        </h1>

        <div>
          <p className="text-2xl font-semibold text-gray-800">
            Counter: <span className="text-blue-500">{counter}</span>
          </p>
          <p className="text-2xl font-semibold text-green-600">
            Rewards: <span className="text-green-500">{rewards}</span>
          </p>
        </div>

        <p className="h-5 text-lg font-semibold text-green-500">{feedback}</p>

        <button
          onClick={debouncedHandleClick}
          disabled={loading}
          className={`px-6 py-2 text-lg font-bold text-white transition-transform transform rounded-lg shadow-lg ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 hover:scale-105'
          }`}
        >
          {loading ? 'Loading...' : 'Click Me!'}
        </button>
      </div>
    </div>
  );
};

export default CookieCard;
