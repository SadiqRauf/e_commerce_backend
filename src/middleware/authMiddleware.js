const { verifyToken } = require('../utils/token/index');
const { User, Authentication } = require('../models/Authentication');


module.exports = async (req, res, next) => {
    const header = req.headers.authorization;
    const token = header && header.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = verifyToken(token);

        // Optional: match token in DB for logout enforcement
        const authRecord = await Authentication.findOne({ where: { user_id: decoded.user_id } });
        if (!authRecord || authRecord.token !== token) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};
