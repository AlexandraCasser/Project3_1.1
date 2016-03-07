var mongoose = require("mongoose");
var locationSchema = require("./locationSchema.js").schema;
var bcrypt = require("bcrypt-nodejs");

var userSchema = new mongoose.Schema({

	username: {type: String},
	password: String,
	location: [locationSchema]

});

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validPassport = function(password) {
	return bcrypt.compareSync(password, this.password);
}


module.exports = mongoose.model("userSchema", userSchema);