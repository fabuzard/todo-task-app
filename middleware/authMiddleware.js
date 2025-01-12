const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables


const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Replace with your secret key
        req.user = decoded; // Attach decoded token to the request object
        next(); // Allow access to the route
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token.' });
    }
};

module.exports =authenticate;