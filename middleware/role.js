function checkRole(requiredRole) {
    return (req, res, next) => {
        // Skip role check if in development mode
        if (process.env.NODE_ENV === 'development') return next();
        
        if (!req.user || req.user.role !== requiredRole) {
            return res.status(403).json({ message: 'Access denied.' });
        }
        next();
    };
}

module.exports = checkRole;