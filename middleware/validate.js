const { validate } = require('../helper/validate');

const validateUser = async (req, res, next) => {
    const validationRule = {
        email: 'required|string|email',
        username: 'required|string',
        name: 'required|string',
        ipaddress: 'required|string|min:8'
    };

    try {
        await validate(req.body, validationRule);
        next();
    } catch (error) {
        res.status(412).json({
            success: false,
            message: 'Validation failed',
            data: error
        });
    }
};

const validateTrack = async (req, res, next) => {
    const validationRule = {
        title: 'required|string',
        artist: 'required|string',
        duration: 'required|integer|min:1', // Assuming duration is in seconds
        genre: 'required|string',
        album: 'required|string',
        releaseDate: 'required|string' 
    };

    try {
        await validate(req.body, validationRule);
        next();
    } catch (error) {
        res.status(412).json({
            success: false,
            message: 'Validation failed',
            data: error
        });
    }
};

module.exports = {
    validateUser,
    validateTrack
};
