import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, UserRole, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock data for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@tayka.com',
    name: 'Administrador Tayka',
    roles: ['admin'],
    createdAt: new Date(),
  },
  {
    id: '2',
    email: 'vendedor@tayka.com',
    name: 'María Condori',
    roles: ['seller', 'buyer'],
    createdAt: new Date(),
  },
  {
    id: '3',
    email: 'comprador@tayka.com',
    name: 'Juan Mamani',
    roles: ['buyer'],
    createdAt: new Date(),
  },
  {
    id: '4',
    email: 'distribuidor@tayka.com',
    name: 'Carlos Quispe',
    roles: ['distributor', 'buyer'],
    createdAt: new Date(),
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('tayka-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Mock authentication
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === '123456') {
      setUser(foundUser);
      localStorage.setItem('tayka-user', JSON.stringify(foundUser));
    } else {
      throw new Error('Credenciales inválidas');
    }
    
    setIsLoading(false);
  };

  const register = async (email: string, _password: string, name: string, roles: UserRole[]) => {
    setIsLoading(true);
    
    // Mock registration
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      roles,
      createdAt: new Date(),
    };
    
    setUser(newUser);
    localStorage.setItem('tayka-user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tayka-user');
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};