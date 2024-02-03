import express from 'express';
import emojis from './emojis.js';
import userRouter, { getAllUsers } from './user.js';
import { login } from '../controllers/user.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);
// user routes
router.use('/user', userRouter);
router.get('/users', getAllUsers);
router.post('/login', login)

export default router;
