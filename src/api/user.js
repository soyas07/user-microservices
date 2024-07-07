import express from 'express';
import { getUser, login, registerUser } from '../controllers/user.js';

const router = express.Router();

// get a user info
router.get('/', getUser);

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