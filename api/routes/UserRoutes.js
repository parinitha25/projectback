module.exports = function(app) {
	var userData = require('../controller/UserController');

// Signup 
 app.route('/signup')
 .post(userData.userSignup);



 //user detail
 app.route('/getUser/:emailId')
 .get(userData.getUser);

 //update 
 app.route('/updateUser')
 .put(userData.updateUser);

// 
//  app.route('/deleteUser/:userId')
//  .delete(userData.deleteUser);

 //Sign
 app.route('/signin')
 .post(userData.userSignin);
};

app.post('/rst',AdminController.restaurants);
app.get('/getbyRstId/:_id',AdminController.getRstID);