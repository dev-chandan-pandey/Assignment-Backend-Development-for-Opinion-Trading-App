// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//   const token = req.header('Authorization');

//   console.log("Received Token:", token); // Add this log for debugging

//   if (!token) return res.status(401).json({ error: 'Access Denied' });

//   try {
//     const extractedToken = token.split(" ")[1]; // Ensure Bearer token format
//     console.log("Extracted Token:", extractedToken); // Log extracted token

//     const verified = jwt.verify(extractedToken, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (error) {
//     console.error("JWT Verification Error:", error.message); // Log specific error
//     res.status(400).json({ error: 'Invalid Token' });
//   }
// };


// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//   const token = req.header('Authorization')?.split(' ')[1];
//   console.log('Received Token:', token); // Add this line for debugging

//   if (!token) return res.status(401).json({ error: 'Access Denied' });

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (error) {
//     console.error('Token Verification Error:', error.message);
//     res.status(400).json({ error: 'Invalid Token' });
//   }
// };
module.exports = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }
  next();
};
