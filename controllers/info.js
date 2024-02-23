const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

/**
 * @swagger
 * tags:
 *   name: User Information
 *   description: Endpoints for managing user information.
 */

/**
 * @swagger
 * /user/all:
 *   get:
 *     summary: Retrieve all user information.
 *     tags:
 *       - User Information
 *     responses:
 *       200:
 *         description: A list of user information.
 *       500:
 *         description: Internal server error.
 */
const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('info').find();
        const info = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(info);
    } catch (error) {
        console.error('Error in getAll:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Retrieve a single user's information by ID.
 *     tags:
 *       - User Information
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
 *         description: User information not found.
 */
const getSingle = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json({ error: 'Invalid ID' });
        }
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('info').find({ _id: userId });
        const info = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(info[0]);
        
    } catch (error) {
        console.error('Error in getSingle:', error);
        res.status(500).json({ error: 'User information not found' });
    }
};

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create user information.
 *     tags:
 *       - User Information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               birthday:
 *                 type: string
 *               color:
 *                 type: string
 *               nickname:
 *                 type: string
 *               hairColor:
 *                 type: string
 *               hobby:
 *                 type: string
 *               address:
 *                 type: string
 *               url:
 *                 type: string
 *               city:
 *                 type: string
 *     responses:
 *       204:
 *         description: User information created successfully.
 *       500:
 *         description: Unknown error while creating user information.
 */
const createUserInfo = async (req, res) => {
    const info = {
        _id: userId,
        birthday: req.body.birthday,
        color: req.body.color,
        nickname: req.body.nickname,
        hairColor: req.body.hairColor,
        hobby: req.body.hobby,
        address: req.body.address,
        url: req.body.url,
        city: req.body.city
    };

    const response = await mongodb.getDatabase().db().collection('info').insertOne(info);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Unknown error while adding user information');
    }
};

/**
 * @swagger
 * /user/update/{id}:
 *   put:
 *     summary: Update user information by ID.
 *     tags:
 *       - User Information
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
 *               birthday:
 *                 type: string
 *               color:
 *                 type: string
 *               nickname:
 *                 type: string
 *               hairColor:
 *                 type: string
 *               hobby:
 *                 type: string
 *               address:
 *                 type: string
 *               url:
 *                 type: string
 *               city:
 *                 type: string
 *     responses:
 *       204:
 *         description: User information updated successfully.
 *       500:
 *         description: Unknown error while updating user information.
 */
const updateUserInfo = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const info = {
        _id: userId,
        birthday: req.body.birthday,
        color: req.body.color,
        nickname: req.body.nickname,
        hairColor: req.body.hairColor,
        hobby: req.body.hobby,
        address: req.body.address,
        url: req.body.url,
        city: req.body.city
    };

    const response = await mongodb.getDatabase().db().collection('info').replaceOne({ _id: userId }, info);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Unknown error while updating user information');
    }
};

/**
 * @swagger
 * /user/delete/{id}:
 *   delete:
 *     summary: Delete user information by ID.
 *     tags:
 *       - User Information
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User information deleted successfully.
 *       500:
 *         description: Unknown error while deleting user information.
 */
const deleteUserInfo = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: 'Invalid ID' });
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('info').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Unknown error while deleting user');
    }
};

module.exports = {
    getAll,
    getSingle,
    createUserInfo,
    updateUserInfo,
    deleteUserInfo
};
