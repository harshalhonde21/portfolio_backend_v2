import { Router } from 'express';
import { ContactController } from './contact.controller';
import { validate } from '../../middlewares/validate.middleware';
import { createContactSchema } from './contact.validator';
import { protect, authorize } from '../../middlewares/auth.middleware';
import { ROLES } from '../../constants';

const router = Router();
const controller = new ContactController();

// Public Routes
router.post('/', validate(createContactSchema), controller.submitContact);

// Admin Routes
router.get(
  '/admin',
  protect,
  authorize(ROLES.ADMIN, ROLES.SUPER_ADMIN),
  controller.getAllContacts
);

export default router;
