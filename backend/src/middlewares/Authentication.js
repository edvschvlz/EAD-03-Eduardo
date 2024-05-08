import jwt from 'jsonwebtoken';

export const Authentication = (req, res, next) => {
  try {
    const token = req.headers['authorization'].substring("Bearer ".length);
    
    if (!token) {
      return res.status(401).json({ auth: false, message: 'No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });
      }

      req.user = decoded;

      next();
    });
  } catch {
    res.status(401).json({
      error: 'Invalid request!',
    });
  }
};
