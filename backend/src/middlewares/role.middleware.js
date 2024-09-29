// Middleware for authorizing the user based on their role
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access Denied: Insufficient permissions.',success:false });
    }
    next();
  };
};

module.exports = authorizeRoles;
