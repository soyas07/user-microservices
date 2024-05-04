import express from 'express'
import Friend from '../models/Friend.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const { id } = req.query;
    
        // Step 1: Retrieve all friend_ids for user_id = 1
        const friendIds = await Friend.findAll({
            attributes: ['friend_id'],
            where: {
                user_id: id
            }
        });

        if (friendIds.length == 0)
            return res.status(404).send({ message: 'User not found' });

        // Extract friend_ids from the result
        const friendIdsArray = friendIds.map(friend => friend.friend_id);

        // Step 2: Retrieve users with the extracted friend_ids
        const friends = await User.findAll({
            where: {
                id: friendIdsArray
            }
        });  
    
        res.send(friends);
    } catch (error) {
        res.status(500).send({ message: error });
    }
});

router.post('/', async(req, res) => {
    try {
        const { user_id, friend_id } = req.body;
        
        // Ensure the User table exists, create it if it doesn't
        await Friend.sync();
        const existingRelationship = await Friend.findOne({
            where: {
                user_id,
                friend_id
            }
        });
        
        if (existingRelationship) {
            // Relationship already exists, return a response indicating the duplicate
            return res.status(400).send({ message: 'Relationship already exists' });
        }
    
        const relation = { user_id, friend_id };
        await Friend.create(relation);
        res.send({ message: 'ok' });
    } catch (error) {
        res.status(500).send({ message: error });
    }
})

export default router;
