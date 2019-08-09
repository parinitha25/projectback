

// var jwt  = require('jsonwebtoken');
// // var config = require('../../../config');

// module.exports = function(req, res, next) {
//     var token = req.body.token || req.query.token || req.headers['authorization'];
   
//     // decode token
//     if (token) {
  
//       // verifies secret and checks exp
//       jwt.verify(token, function(err, decoded) {       
//           if (err) {
//           return res.json({ success: false, message: 'Failed to authenticate token.' });       
//            }
//           else {
//           req.decoded = decoded;         
//           next();
//           }
//       });
  
//     } else {
//       return res.status(403).send({ 
//           success: false, 
//           message: 'No token provided.' 
//       });
  
//     }
//   }


const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
const authHeader = req.get('Authorization');
if (!authHeader) {
const error = new Error('Not authenticated.');
error.statusCode = 401;
throw error;
}
const token = authHeader;
let decodedToken;
try {
decodedToken = jwt.verify(token, 'secret');
} catch (err) {
err.statusCode = 500;
throw err;
}
if (!decodedToken) {
const error = new Error('Not authenticated.');
error.statusCode = 401;
throw error;
}
req.userId = decodedToken.userId;
next();
};





