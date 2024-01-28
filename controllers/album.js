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
}

const getAll = async (req, res) => {
    // #swagger.tags = ['Albums']
    const result = await mongodb.getDatabase().db().collection('albums').find();
    result.toArray().then((songs) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(songs);
    })
}

const getById = async (req, res) => {
    // #swagger.tags = ['Albums']
    const albumId = { _id: new ObjectId(req.params.id) }
    const result = await mongodb.getDatabase().db().collection('albums').find(albumId);
    result.toArray().then((album) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(album);
    })
}

const addAlbum = async (req, res) => {
    // #swagger.tags = ['Albums']

    const newAlbum = {
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        duration: req.body.duration,
        release_year: req.body.release_year,
        single: req.body.single
    }

    await validator(newAlbum, validationRules, {}, (err, status) => {
        // #swagger.tags = ['Albums']
        if(!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            mongodb.getDatabase().db().collection('albums').insertOne(newAlbum).then((result) => {
                res.status(200).json(result);
            })
        }
    }).catch( err => console.log(err));
}

const updateAlbum = async (req, res) => {
    // #swagger.tags = ['Albums']
    const albumId = { _id: new ObjectId(req.params.id) }

    const newValues = {
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        duration: req.body.duration,
        release_year: req.body.release_year,
        single: req.body.single
    }

    await validator(newValues, validationRules, {}, (err, status) => {
        // #swagger.tags = ['Albums']
        if(!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            mongodb.getDatabase().db().collection('albums').updateOne(albumId, { $set: newValues }).then((result) => {
                res.status(200).json(result);
            })
        }
    }).catch( err => console.log(err));  
}
const deleteAlbum = async (req, res) => {
    // #swagger.tags = ['Albums']
    const albumId = { _id: new ObjectId(req.params.id) }

    mongodb.getDatabase().db().collection('albums').deleteOne(albumId).then((result) => {
        res.status(200).json(result);
    })
}

module.exports = {
    getAll,
    getById,
    addAlbum,
    updateAlbum,
    deleteAlbum,
}