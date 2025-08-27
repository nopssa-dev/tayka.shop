import Router  from 'express';
import { UserController } from '../controllers/UserController';


const router = Router();

// GET /api/members - Obtener todos los miembros (solo admin)
router.get('/',UserController.getAllUsers); 
  



export default router;