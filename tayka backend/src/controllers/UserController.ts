import type { Request, Response } from 'express';
    



export class UserController {
  static getAllUsers = async (req:Request, res:Response) => {
   
      res.send('  Obtener todos los usuarios');
    
  }}