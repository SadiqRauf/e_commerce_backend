const bcrypt = require('bcrypt');
const { User, Authentication } = require('../models/Authentication');
const { generateToken, verifyToken } = require('../utils/token/index');

exports.register = async (req, res) => {
    try {
        const { user, auth } = req.body;

        // 1. Create user
        const newUser = await User.create(user);

        // 2. Hash password
        const hashedPassword = await bcrypt.hash(auth.password, 10);

        // 3. Create authentication record
        await Authentication.create({
            user_id: newUser.id,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            username: auth.username,
            password_hash: hashedPassword
        });

        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
};


exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const auth = await Authentication.findOne({ where: { username } });
        if (!auth) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, auth.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken({ user_id: auth.user_id });

        await auth.update({ token });

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// LOGOUT
exports.logout = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ error: 'Token missing' });

        const decoded = verifyToken(token);

        await Authentication.update({ token: null }, { where: { user_id: decoded.user_id } });

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        console.error('Logout error:', err);
        res.status(401).json({ error: 'Invalid token or already logged out' });
    }
};

// ME
exports.me = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ error: 'Token missing' });

        const decoded = verifyToken(token);

        const user = await User.findByPk(decoded.user_id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.status(200).json({ user });
    } catch (err) {
        console.error('Me error:', err);
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};
