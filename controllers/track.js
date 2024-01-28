const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const validator = require('../helper/validate');

let validationRules = {
    title: 'required|string',
    artist: 'required|string',
    album: 'required|string',
}

const getAll = async (req, res) => {
    // #swagger.tags = ['Tracks']
    const result = await mongodb.getDatabase().db().collection('tracks').find();
    result.toArray().then((tracks) => {
        res.json(tracks);
    });
};

const getById = async (req, res) => {
     // #swagger.tags = ['Tracks']
    const trackId = { _id: new ObjectId(req.params.id) };
    const result = await mongodb.getDatabase().db().collection('tracks').find(trackId);
    result.toArray().then((track) => {
        res.status(200).json(track);
    });
};

const addTrack = async (req, res) => {
     // #swagger.tags = ['Tracks']
    const newTrack = {
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
    };

    await validator(newTrack, validationRules, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err,
            });
        } else {
            mongodb.getDatabase().db().collection('tracks').insertOne(newTrack).then((result) => {
                res.status(200).json(result);
            });
        }
    }).catch((err) => console.log(err));
};

const updateTrack = async (req, res) => {
     // #swagger.tags = ['Tracks']
    const trackId = { _id: new ObjectId(req.params.id) };

    const newValues = {
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
    };

    await validator(newValues, validationRules, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err,
            });
        } else {
            mongodb.getDatabase().db().collection('tracks').updateOne(trackId, { $set: newValues }).then((result) => {
                res.status(200).json(result);
            });
        }
    }).catch((err) => console.log(err));
};

const deleteTrack = async (req, res) => {
     // #swagger.tags = ['Tracks']
    const trackId = { _id: new ObjectId(req.params.id) };

    mongodb.getDatabase().db().collection('tracks').deleteOne(trackId).then((result) => {
        res.status(200).json(result);
    });
};

module.exports = {
    getAll,
    getById,
    addTrack,
    updateTrack,
    deleteTrack
};
