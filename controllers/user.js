const { getDatabase } = require('../data/database');
const { ObjectId } = require('mongodb');

const handleError = (res, error, defaultMessage) => {
    console.error('Error:', error);
    res.status(500).json({ error: defaultMessage });
};

const getAllUsers = async (req, res) => {
    try {
        const users = await mongodb.getDatabase().collection('users').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    } catch (error) {
        handleError(res, error, 'Internal Server Error');
    }
};

const getSingleUser = async (req, res) => {
    try {
        const userId = ObjectId(req.params.id);
        const user = await mongodb.getDatabase().collection('users').findOne({ _id: userId });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(user);
    } catch (error) {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json({ error: 'Invalid ID' });
            return;
        }
        handleError(res, error, 'User not found');
    }
};

const createUser = async (req, res) => {
    try {
        const user = {
            email: req.body.email,
            username: req.body.username,
            name: req.body.name,
            ipaddress: req.body.ipaddress,
        };

        const response = await mongodb.getDatabase().collection('users').insertOne(user);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json({ error: 'Unknown error while creating user' });
        }
    } catch (error) {
        handleError(res, error, 'Unknown error while creating user');
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = ObjectId(req.params.id);
        const user = {
            email: req.body.email,
            username: req.body.username,
            name: req.body.name,
            ipaddress: req.body.ipaddress,
        };

        const response = await mongodb.getDatabase().collection('users').replaceOne({ _id: userId }, user);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json({ error: 'Invalid ID' });
            return;
        }
        handleError(res, error, 'Unknown error while updating user');
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = ObjectId(req.params.id);
        const response = await mongodb.getDatabase().collection('users').deleteOne({ _id: userId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json({ error: 'Invalid ID' });
            return;
        }
        handleError(res, error, 'Unknown error while deleting user');
    }
};

module.exports = {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
};
