import express from 'express';
import { checkAuth } from '../middleware/auth.middleware.js';
import { sendMessage } from '../controllers/message.controller.js';
const router = express.Router();


router.post('/send/:id', checkAuth, sendMessage)




export default router;
