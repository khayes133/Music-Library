const validator = require('../helper/validate');

const saveUser = async (req, res, next) => {
    const validationRule = {
        "email": "required|string|email",
        "username": "required|string",
        "name": "required|string",
        "ipaddress": "required|string|min:8"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}

const saveUserInfo = async(req, res, next) => {
    const validationRule = {
        "birthday": "required|string",
        "color": "required|string",
        "nickname": "required|string",
        "hairColor": "required|string",
        "hobby": "required|string",
        "address": "required|string",
        "url": "required|string",
        "city": "required|string"
    }

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}

module.exports = {
    saveUser,
    saveUserInfo
};