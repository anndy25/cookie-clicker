import { createContext, useState, useEffect } from 'react';

export type IUser = {
  username: string;
  userId: string;
};

export type UserContextType = {
  userInfo: IUser | null;
  setUser: (userInfo: IUser) => void;
  removeUser: () => void;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userInfo, setUserInfo] = useState<IUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
    }
  }, []);

  const setUser = (user: IUser) => {
    localStorage.setItem('userInfo', JSON.stringify(user));
    setUserInfo(user);
  };

  const removeUser = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
  };

  return (
    <UserContext.Provider value={{ userInfo, setUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
}
