import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'tu_correo@gmail.com',
    pass: 'tu_password_de_aplicacion'
  }
});

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, confirmPassword, roles } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(409).json({ message: 'El correo electrónico ya está registrado.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            confirmPassword: hashedPassword,
            roles
        });
        await user.save();
        
        const token = jwt.sign({ id: user._id, roles: user.roles }, JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'Usuario registrado con éxito', token, user: { id: user._id, name: user.name, email: user.email, roles: user.roles } });
    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ message: 'Hubo un error al registrar el usuario' });
    }
};

export const requestMagicLink = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        const magicToken = crypto.randomBytes(32).toString('hex');
        const tokenExpiry = Date.now() + 3600000;
        user.magicToken = magicToken;
        user.magicTokenExpiry = tokenExpiry;
        await user.save();

        const magicLink = `${FRONTEND_URL}/auth/login?token=${magicToken}`;

        const mailOptions = {
            from: 'tu_correo@gmail.com',
            to: email,
            subject: 'Tu enlace de inicio de sesión mágico',
            html: `<p>Haz clic en el siguiente enlace para iniciar sesión: <a href="${magicLink}">${magicLink}</a></p>`
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Enlace de inicio de sesión enviado a tu correo electrónico.' });
    } catch (error) {
        console.error('Error al solicitar enlace mágico:', error);
        res.status(500).json({ message: 'Hubo un error al enviar el enlace.' });
    }
};

export const loginWithMagicLink = async (req: Request, res: Response) => {
    try {
        const { token } = req.body;
        const user = await User.findOne({ magicToken: token, magicTokenExpiry: { $gt: Date.now() } });

        if (!user) {
            return res.status(400).json({ message: 'Token no válido o expirado.' });
        }

        user.magicToken = undefined;
        user.magicTokenExpiry = undefined;
        await user.save();

        const authToken = jwt.sign({ id: user._id, roles: user.roles }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Inicio de sesión exitoso', token: authToken, user: { id: user._id, name: user.name, email: user.email, roles: user.roles } });
    } catch (error) {
        console.error('Error al iniciar sesión con enlace mágico:', error);
        res.status(500).json({ message: 'Hubo un error al iniciar sesión.' });
    }
};

