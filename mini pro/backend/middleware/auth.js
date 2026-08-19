import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'campus_connect_sona_secret_key_2026';

// Middleware to verify JWT Token
export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1]; // "Bearer TOKEN"

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
      }
      req.user = user;
      next();
    });
  } else {
    // For demo convenience, allow guest request with default fallback
    req.user = { id: 'std-1', role: 'Student', name: 'Lathika S K' };
    next();
  }
};

// Enforce Admin Role
export const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied: Administrator privilege required' });
  }
};

export { JWT_SECRET };
