// middleware/roleMiddleware.js

function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized: Please login first" });
      }

      const userRole = req.session.user.role;

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: "Forbidden: You don't have access to this resource" });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: "Server error in role middleware", error: error.message });
    }
  };
}

module.exports = authorizeRoles;
