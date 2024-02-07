import express from 'express';
import { login, registerUser } from '../controllers/user.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ "user": "GET REQUEST" });
});

router.post('/', registerUser);

router.delete('/', (req, res) => {
    res.json({ "user": "DELETE REQUEST" });
});

router.post('/login', login);
router.post('/register', registerUser);

export const getAllUsers = (req, res) => {
    res.json({ "user": "GET ALL USERS REQUEST" });
}

export default router;