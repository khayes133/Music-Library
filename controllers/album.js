const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const validator = require('../helper/validate');

let validationRules = {
    title: 'required|string',
    artist: 'required|string',
    album: 'required|string',
    duration: 'required|string',
    release_year: 'required|string',
    single: 'required|boolean'
};

const handleValidationError = (res, err) => {
    res.status(412).json({
        success: false,
        message: 'Validation failed',
        errors: err
    });
};

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('albums').find().toArray();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const getById = async (req, res) => {
    try {
        const albumId = { _id: new ObjectId(req.params.id) };
        const result = await mongodb.getDatabase().db().collection('albums').findOne(albumId);
        if (!result) {
            return res.status(404).json({ success: false, message: 'Album not found' });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const addAlbum = async (req, res) => {
    const newAlbum = req.body;

    try {
        await validator(newAlbum, validationRules);
        const result = await mongodb.getDatabase().db().collection('albums').insertOne(newAlbum);
        res.status(200).json(result);
    } catch (error) {
        if (error.name === 'ValidationError') {
            handleValidationError(res, error);
        } else {
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }
};

const updateAlbum = async (req, res) => {
    const albumId = { _id: new ObjectId(req.params.id) };
    const newValues = req.body;

    try {
        await validator(newValues, validationRules);
        const result = await mongodb.getDatabase().db().collection('albums').updateOne(albumId, { $set: newValues });
        res.status(200).json(result);
    } catch (error) {
        if (error.name === 'ValidationError') {
            handleValidationError(res, error);
        } else {
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }
};

const deleteAlbum = async (req, res) => {
    try {
        const albumId = { _id: new ObjectId(req.params.id) };
        const result = await mongodb.getDatabase().db().collection('albums').deleteOne(albumId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    getAll,
    getById,
    addAlbum,
    updateAlbum,
    deleteAlbum
};
