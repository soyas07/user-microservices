import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export const registerUser = async (req, res) => {
    const { username, email, password, roles } = req.body;

    try {
        // Ensure the User table exists, create it if it doesn't
        await User.sync();
        // check if email or password is empty
        if (!email || !password || !username || !roles)
            return res.status(400).json({ message: 'Email and Password are required' });

        // Check if the email is already in use
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser)
            return res.status(409).json({ message: 'Email is already in use' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { username, email, password: hashedPassword, roles };
        await User.create(user);

        res.status(201).json({ message: 'ok' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) 
        return res.status(400).json({ message: 'Email and Password are required' });

    const user = await User.findOne({ where: { email } });
    if (!user)
        return res.status(401).json({ message: 'Invalid credentials. Please try again.' });

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword)
        return res.status(401).json({ message: 'Invalid credentials. Please try again.' });

    return res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email
    });
};

export const getUser = async (req, res) => {
    const { id } = req.query;

    // debugging purposes
    console.log(`Query Id: ${id}`);
    
    // get a user by id
    const user = await User.findOne({ where: { id } });
    if (!user)
        return res.status(404).json({ message: 'User does not exists' });

    const { password, roles, createdAt, updatedAt, ...cleanUser } = user.dataValues;
    res.status(200).json(cleanUser);
}