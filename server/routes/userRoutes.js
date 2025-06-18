import express from 'express';
import { registerUser, loginUser, userCredit, logoutUser } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/credit', authMiddleware, userCredit);
router.post('/logout', logoutUser);

export default router;
