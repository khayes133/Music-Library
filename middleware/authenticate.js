const isAuthenticated = (req, res, next) => {
    if (req.session.user === undefined) {
        return res.status(401).json("You don't have permission to access this page");
    }
    next();
};

module.exports = {
    isAuthenticated
};