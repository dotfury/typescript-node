import express from 'express';

import extractJWT from '../../middleware/extractJWT';
import controller from '../../controllers/auth';

const router = express.Router();

// TODO: maybe rename this to users controller
router.post('/register', controller.registerUser);
router.get('/validate', extractJWT, controller.validateToken);
router.post('/login', controller.login);
router.get('/all', controller.getAllUsers);

export default router;
