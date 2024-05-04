import { DataTypes } from 'sequelize';
import sequelize from '../utils/connection.js';

import User from './User.js';

const Friend = sequelize.define('Friend', {
    // model properties
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    friend_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    status: {
        type: DataTypes.ENUM('pending', 'accepted'),
        allowNull: false,
        defaultValue: 'pending'
    }
});

// Define associations
Friend.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Friend.belongsTo(User, { foreignKey: 'friend_id', as: 'friend' });

export default Friend;
