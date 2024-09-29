const jwt = require('jsonwebtoken');
const User =require('../models/user.model')
// Middleware for authenticating the user
const authenticateUser = async(req, res, next) => {
  const token = req.headers.authorization; 
console.log(token)
  if (!token) {
    return res.status(401).json({ message: 'No token provided', success: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = await User.findById({_id:decoded.id});

    if (!req.user) {
      return res.status(404).json({ message: 'User not found', success: false });
    }

    next(); 
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: 'Unauthorized', success: false });
  }
};

module.exports = authenticateUser;
