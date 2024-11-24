'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '../../types/users';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setAuth] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const setAuthContext = (user: User) => {
    setUser(user);
    setAuth(true);
  };

  const removeAuthContext = () => {
    setUser(null);
    setAuth(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const loadUser = () => {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      if (token && storedUser) {
        setAuth(true);
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuth, isLoading, setAuthContext, removeAuthContext }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
