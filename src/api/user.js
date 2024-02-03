import express from 'express';
import { registerUser } from '../controllers/user.js';
import { authenticate } from '../middlewares.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ "user": "GET REQUEST" });
});

router.post('/', registerUser);

router.delete('/', (req, res) => {
    res.json({ "user": "DELETE REQUEST" });
});

export const getAllUsers = (req, res) => {
    res.json({ "user": "GET ALL USERS REQUEST" });
}

export default router;