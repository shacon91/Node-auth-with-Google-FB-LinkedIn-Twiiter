var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const userSchema = new Schema({
	username: String,
	googleId: String,
	facebookId: String,
	linkedinId: String,
	twitterId: String,
	email: String,
	password: String,
	name: String
});

const User = mongoose.model('user',userSchema);

module.exports = User;