const secretekey='dsfhsjdfsdkjfskfjskfjsk';
const jwt = require('jsonwebtoken');
const signupModal = require('../modal/signupmodal');
require('dotenv').config();

const verify = async (req, res, next) => {
    try {
        let token = req.headers['authorization'];

        // Check if the token exists
        if (!token) {
            return res.status(401).json({ error: 'Token is missing' });
        }

        // Verify the token
        const verified = jwt.verify(token, secretekey);
        console.log('verified', verified);

        
        // Pass user information to the next middleware if needed
        req.userid = verified.userid;
        

        next();
    } catch (err) {
        console.error(err);
        return res.status(403).json({ error: 'Invalid token' });
    }
};

module.exports = verify;
