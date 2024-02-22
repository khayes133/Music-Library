const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const validator = require('../helper/validate');

let validationRules = {
    title: 'required|string',
    artist: 'required|string',
    album: 'required|string',
};

const handleValidationError = (res, err) => {
    res.status(412).json({
        success: false,
        message: 'Validation failed',
        errors: err,
    });
};

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('tracks').find().toArray();
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const getById = async (req, res) => {
    try {
        const trackId = { _id: new ObjectId(req.params.id) };
        const result = await mongodb.getDatabase().db().collection('tracks').findOne(trackId);
        if (!result) {
            return res.status(404).json({ success: false, message: 'Track not found' });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const addTrack = async (req, res) => {
    const newTrack = req.body;

    try {
        await validator(newTrack, validationRules);
        const result = await mongodb.getDatabase().db().collection('tracks').insertOne(newTrack);
        res.status(200).json(result);
    } catch (error) {
        if (error.name === 'ValidationError') {
            handleValidationError(res, error);
        } else {
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }
};

const updateTrack = async (req, res) => {
    const trackId = { _id: new ObjectId(req.params.id) };
    const newValues = req.body;

    try {
        await validator(newValues, validationRules);
        const result = await mongodb.getDatabase().db().collection('tracks').updateOne(trackId, { $set: newValues });
        res.status(200).json(result);
    } catch (error) {
        if (error.name === 'ValidationError') {
            handleValidationError(res, error);
        } else {
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }
};

const deleteTrack = async (req, res) => {
    try {
        const trackId = { _id: new ObjectId(req.params.id) };
        const result = await mongodb.getDatabase().db().collection('tracks').deleteOne(trackId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    getAll,
    getById,
    addTrack,
    updateTrack,
    deleteTrack,
};
