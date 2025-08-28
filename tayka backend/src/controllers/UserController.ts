import type { Request, Response } from 'express';
import User from '../models/User';   



export class UserController {
  static createUsers = async (req:Request, res:Response) => {
      const user = new User(req.body);
      try {
        await user.save();
        res.send('Usuario creado correctamente');
      } catch (error) {
        console.log('error')
      }
    
  }

  
  static getAllUsers = async (req:Request, res:Response) => {
        
       try {
        const users = await User.find({});
        
        res.json(users);
      } catch (error) {
        console.log('error')
      }
      res.send('Obtener todos los usuarios');
    
  }

 static getUsersById = async (req:Request, res:Response) => {
      const {id}= req.params;
       try {
        const user = await User.findById(id);
        if (!user) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user);
      } catch (error) {
        console.log('error')
      }
      res.send('se obtiene un usuario por id');
    
  }

   static updateUser = async (req:Request, res:Response) => {
      const {id}= req.params;
       try {
        const user = await User.findByIdAndUpdate(id, req.body);
        if (!user) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        await user.save();
        res.send('Usuario actualizado correctamente');
      } catch (error) {
        console.log('error')
      }
      res.send('se obtiene un usuario por id');
    
  }


  static deleteUser = async (req:Request, res:Response) => {
      const {id}= req.params;
       try {
        const user = await User.findById(id);
        if (!user) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        await user.deleteOne
        res.send('Usuario eliminado correctamente');
      } catch (error) {
        console.log('error')
      }
      res.send('se obtiene un usuario por id');
    
  }
}