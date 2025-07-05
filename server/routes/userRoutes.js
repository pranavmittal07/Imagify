import express from 'express';
import { registerUser, loginUser, userCredit, logoutUser, paymentRazorpay, verifyRazorpay } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/credit', authMiddleware, userCredit);
router.post('/logout', logoutUser);
router.post('/pay-razor', authMiddleware, paymentRazorpay)
router.post('/verify-razor', verifyRazorpay)

export default router;
