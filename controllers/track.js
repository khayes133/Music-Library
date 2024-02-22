const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllTracks = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('tracks').find();
        const tracks = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(tracks);
    } catch (error) {
        console.error('Error in getAllTracks:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getSingleTrack = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json({ error: 'Invalid ID' });
            return;
        }
        const trackId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('tracks').find({ _id: trackId });
        const track = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(track[0]);
        
    } catch (error) {
        console.error('Error in getSingleTrack:', error);
        res.status(500).json({ error: 'Music track not found' });
    }
};

const createTrack = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: 'Invalid ID' });
        return;
    }

    const trackId = new ObjectId(req.params.id);

    const track = {
        _id: trackId,
        title: req.body.title,
        artist: req.body.artist,
        duration: req.body.duration,
        genre: req.body.genre,
        album: req.body.album,
        releaseDate: req.body.releaseDate,
        // Add any additional fields specific to music tracks
    };

    const response = await mongodb.getDatabase().db().collection('tracks').insertOne(track);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Unknown error while adding music track');
    }
};

const updateTrack = async (req, res) => {
    const trackId = new ObjectId(req.params.id);
    const track = {
        _id: trackId,
        title: req.body.title,
        artist: req.body.artist,
        duration: req.body.duration,
        genre: req.body.genre,
        album: req.body.album,
        releaseDate: req.body.releaseDate,
        // Add any additional fields specific to music tracks
    };

    const response = await mongodb.getDatabase().db().collection('tracks').replaceOne({ _id: trackId }, track);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Unknown error while updating music track');
    }
};

const deleteTrack = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: 'Invalid ID' });
        return;
    }
    const trackId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('tracks').deleteOne({ _id: trackId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Unknown error while deleting music track');
    }
};


module.exports = {
    getAllTracks,
    getSingleTrack,
    createTrack,
    updateTrack,
    deleteTrack
};
