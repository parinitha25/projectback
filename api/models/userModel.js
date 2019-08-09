var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  FirstName:{
    type:String,
    required:'please Enter valid name'
  },
  LastName:{
    type:String,
    required:'please Enter valid name'
  },
  Email: {
    type: String,
    required: 'Please Enter valid emailId'
  },
  Password: {
    type: String,
    required: 'Please Enter the current password'
  },
  Phone: {
    type: Number,
    required: 'Please Enter mobile number'
  }, 
  Created_date: {
    type: Date,
  }
});

module.exports = mongoose.model('UserInfo', UserSchema);


