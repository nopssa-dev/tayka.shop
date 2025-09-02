import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        roles: string[];
      };
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string, roles: string[] };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token no válido.' });
  }
};
