import express from 'express';
import { login, signup } from '../../controllers/authController';

const router = express.Router();

// Auth routes
router.post('/signup', signup);  // Route for signup
router.post('/login', login);    // Route for login

export default router;
