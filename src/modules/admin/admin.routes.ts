import { Router } from 'express';
import { AdminController } from './admin.controller';
import { protect } from '../../middlewares/auth.middleware';

const router = Router();
const controller = new AdminController();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/verify-token', protect, controller.getMe);

export default router;
