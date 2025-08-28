import Router  from 'express';
import { UserController } from '../controllers/UserController';
import { body, param } from 'express-validator';
import { hundleValidationErrors } from '../middleware/validation';


const router = Router();
router.post('/',
    // Validaciones
    body('name').notEmpty().withMessage('El nombre de usuario es obligatorio'),
    body('email').isEmail().withMessage('El email no es válido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('confirmPassword').isLength({ min: 6 }).withMessage('La contraseña debe coincidir'),
    hundleValidationErrors,
    UserController.createUsers
);
            
// GET /api/members - Obtener todos los miembros (solo admin)
router.get('/',UserController.getAllUsers); 

router.get('/:id',
    param('id').isMongoId().withMessage('ID de usuario no válido'),
    hundleValidationErrors,
    UserController.getUsersById); 

    router.put('/:id',
    param('id').isMongoId().withMessage('ID de usuario no válido'),
    body('name').notEmpty().withMessage('El nombre de usuario es obligatorio'),
    body('email').isEmail().withMessage('El email no es válido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('confirmPassword').isLength({ min: 6 }).withMessage('La contraseña debe coincidir'),
    hundleValidationErrors,
    UserController.updateUser); 
  
router.delete('/:id',
    param('id').isMongoId().withMessage('ID de usuario no válido'),
    hundleValidationErrors,
    UserController.deleteUser); 


export default router;