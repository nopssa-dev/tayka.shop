import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { body, param } from 'express-validator';
import { hundleValidationErrors } from '../middleware/validation';

const router = Router();

// POST /api/members - Crear un nuevo miembro (solo admin)
router.post('/',
    body('name').notEmpty().withMessage('El nombre de usuario es obligatorio'),
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
    UserController.createUsers
);
         
// GET /api/members - Obtener todos los miembros (solo admin)
router.get('/', UserController.getAllUsers); 

router.get('/:id',
    param('id').isMongoId().withMessage('ID de usuario no válido'),
    hundleValidationErrors,
    UserController.getUsersById
); 

router.put('/:id',
    param('id').isMongoId().withMessage('ID de usuario no válido'),
    body('name').optional().notEmpty().withMessage('El nombre de usuario es obligatorio'),
    body('email').optional().isEmail().withMessage('El email no es válido'),
    body('password').optional().isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('confirmPassword').optional().custom((value, { req }) => {
        if (req.body.password && value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden');
        }
        return true;
    }),
    body('roles').optional().isArray().withMessage('Los roles deben ser un arreglo'),
    body('roles.*').optional().isIn(['buyer', 'seller', 'distributor', 'admin']).withMessage('Rol no válido'),
    hundleValidationErrors,
    UserController.updateUser
); 
 
router.delete('/:id',
    param('id').isMongoId().withMessage('ID de usuario no válido'),
    hundleValidationErrors,
    UserController.deleteUser
); 

export default router;
