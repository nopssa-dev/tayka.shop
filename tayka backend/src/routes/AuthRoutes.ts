import { Router } from 'express';
import { body } from 'express-validator';
import { hundleValidationErrors } from '../middleware/validation';
import { registerUser, requestMagicLink, loginWithMagicLink } from '../controllers/AuthController';

const router = Router();

router.post('/register',
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('El email no es válido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden');
        }
        return true;
    }),
    body('roles').optional().isArray().withMessage('Los roles deben ser un arreglo'),
    body('roles.*').optional().isIn(['buyer', 'seller', 'distributor', 'admin']).withMessage('Rol no válido'),
    hundleValidationErrors,
    registerUser
);

router.post('/request-magic-link',
    body('email').isEmail().withMessage('El email no es válido'),
    hundleValidationErrors,
    requestMagicLink
);

router.post('/login-magic',
    body('token').notEmpty().withMessage('El token es obligatorio'),
    hundleValidationErrors,
    loginWithMagicLink
);

export default router;
