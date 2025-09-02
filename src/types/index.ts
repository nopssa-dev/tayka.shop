// import { z } from "zod";


// const registerSchema = z
//   .object({
//     _id: z.string(), 
//     name: z.string(),
//     email: z.string(),
//     password: z.string(),
//     confirmPassword: z.string(),
//     roles: z
//       .array(z.enum([])),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Las contraseñas no coinciden",
//     path: ["confirmPassword"],
//   });

// type FormData = z.infer<typeof registerSchema>;
// export type RegisterFormData=Pick<FormData, 'name' | 'email' | 'password' | 'confirmPassword'> & {roles: UserRole[]};




export interface User {
  id: string;
  email: string;
  name: string;
  roles: UserRole[];
  avatar?: string;
  createdAt: Date;
}

export type UserRole = 'buyer' | 'seller' | 'distributor'| 'admin';

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