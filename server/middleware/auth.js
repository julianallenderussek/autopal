
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.authenticateToken = (req, res, next) => {
  // Get the token from the request headers, query string, or cookies
  const token = req.headers['authorization']; // Assuming token is in the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("JWT Verification Error:", err);
      return res.status(403).json({ message: 'Token is not valid' });
    }
  
    // Attach the decoded user information to the request object for further processing
    req.user = decoded;
    next(); // Pass control to the next middleware
  });
  
}