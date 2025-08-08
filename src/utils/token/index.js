
require('dotenv').config();
const jwt = require('jsonwebtoken');


module.exports = {
    generateToken: (payload) =>
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }),

    verifyToken: (token) =>
        jwt.verify(token, process.env.JWT_SECRET),

    decodeToken: (token) => jwt.decode(token, { complete: true }),
};
