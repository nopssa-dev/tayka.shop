import type { Request, Response } from 'express';
import User from './../models/User';

export class UserController {
    
    static createUsers = async (req:Request, res:Response) => {
        try {
            const { name, email, password, confirmPassword, roles } = req.body;
            
            // Verificar si el usuario ya existe
            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(409).json({ message: 'El correo electrónico ya está registrado.' });
            }

            const user = new User({ name, email, password, confirmPassword, roles });
            await user.save();
            
            res.status(201).json({ message: 'Usuario creado correctamente', user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Hubo un error al crear el usuario' });
        }
    }

    static getAllUsers = async (req:Request, res:Response) => {
        try {
            const users = await User.find({});
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Hubo un error al obtener los usuarios' });
        }
    }

    static getUsersById = async (req:Request, res:Response) => {
        const { id } = req.params;
        try {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Hubo un error al obtener el usuario' });
        }
    }

    static updateUser = async (req:Request, res:Response) => {
        const { id } = req.params;
        try {
            const user = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.status(200).json({ message: 'Usuario actualizado correctamente', user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Hubo un error al actualizar el usuario' });
        }
    }

    static deleteUser = async (req:Request, res:Response) => {
        const { id } = req.params;
        try {
            const user = await User.findByIdAndDelete(id);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.status(200).json({ message: 'Usuario eliminado correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Hubo un error al eliminar el usuario' });
        }
    }
}
