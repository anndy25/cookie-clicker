import CookieCard from '../components/CookieCard';
import Login from '../components/Login';
import { useUser } from '../hooks/useUser';

const App = () => {
  const { userInfo } = useUser();
  return <div>{userInfo?.username?.length ? <CookieCard /> : <Login />}</div>;
};

export default App;
