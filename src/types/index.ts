export interface User {
  id: string;
  email: string;
  name: string;
  roles: UserRole[];
  avatar?: string;
  createdAt: Date;
}

export type UserRole = 'buyer' | 'seller' | 'distributor' | 'admin';

export interface Store {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  logo?: string;
  banner?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  storeId: string;
  stock: number;
  isActive: boolean;
  createdAt: Date;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, roles: UserRole[]) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}