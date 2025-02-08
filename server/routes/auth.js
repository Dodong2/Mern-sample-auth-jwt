const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).send('Access denied');

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verified._id);
        if (!user) return res.status(401).send('Access denied');

        req.user = user;
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
};

module.exports = auth;