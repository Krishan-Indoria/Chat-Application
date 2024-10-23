import express from 'express';
import { getAllUsers } from '../controllers/user.controller.js';
const router = express.Router();
import { checkAuth } from '../middleware/auth.middleware.js';

router.get('/getusers', checkAuth, getAllUsers)



export default router;