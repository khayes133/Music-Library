const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints for managing user data.
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all users.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: A list of users.
 *       500:
 *         description: Internal server error.
 */
const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('users').find();
        const users = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    } catch (error) {
        console.error('Error in getAll:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a single user by ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User information.
 *       400:
 *         description: Invalid ID.
 *       500:
 *         description: User not found.
 */
const getSingle = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json({ error: 'Invalid ID' });
        }
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId });
        const users = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
        
    } catch (error) {
        console.error('Error in getSingle:', error);
        res.status(500).json({ error: 'User not found' });
    }
};

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               name:
 *                 type: string
 *               ipaddress:
 *                 type: string
 *     responses:
 *       204:
 *         description: User created successfully.
 *       500:
 *         description: Unknown error while creating user.
 */
const createUser = async (req, res) => {
    const user = {
        email: req.body.email,
        username: req.body.username,
        name: req.body.name,
        ipaddress: req.body.ipaddress,
    };

    const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Unknown error while creating user');
    }
};

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               name:
 *                 type: string
 *               ipaddress:
 *                 type: string
 *     responses:
 *       204:
 *         description: User updated successfully.
 *       500:
 *         description: Unknown error while updating user.
 */
const updateUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const user = {
        email: req.body.email,
        username: req.body.username,
        name: req.body.name,
        ipaddress: req.body.ipaddress,
    };

    const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Unknown error while updating user');
    }
};

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted successfully.
 *       500:
 *         description: Unknown error while deleting user.
 */
const deleteUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: 'Invalid ID' });
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Unknown error while deleting user');
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};
