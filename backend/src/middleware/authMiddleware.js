// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//   const token = req.header('Authorization');
//   if (!token) return res.status(401).json({ error: 'Access Denied' });

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (error) {
//     res.status(400).json({ error: 'Invalid Token' });
//   }
// };
// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//   try {
//     const authHeader = req.header('Authorization');
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({ error: 'Access Denied. No token provided.' });
//     }

//     const token = authHeader.split(' ')[1]; // Extract JWT
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified; // Attach decoded user data

//     next();
//   } catch (error) {
//     res.status(400).json({ error: 'Invalid Token' });
//   }
// };

// module.exports = (req, res, next) => {
//   const authHeader = req.header('Authorization');
//   console.log('Authorization Header:', authHeader); // Debugging

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ error: 'Access Denied. No token provided.' });
//   }

//   const token = authHeader.split(' ')[1];
//   console.log('Extracted Token:', token); // Debugging

//   try {
   
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (error) {
//     console.error('JWT Verification Error:', error.message);
//     res.status(400).json({ error: 'Invalid Token' });
//   }
// };
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log('Authorization Header:', authHeader); // Debugging

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access Denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Extracted Token:', token); // Debugging

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(verified,"verified")
    console.log('Verified Token:', verified); // Debugging
    req.user = verified;
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error.message);
    res.status(400).json({ error: 'Invalid Token' });
  }
};


// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//   const token = req.header('Authorization');
  
//   if (!token) {
//     return res.status(401).json({ error: 'Access Denied. No Token Provided.' });
//   }

//   try {
//     const verified = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (error) {
//     res.status(400).json({ error: 'Invalid Token' });
//   }
// };


