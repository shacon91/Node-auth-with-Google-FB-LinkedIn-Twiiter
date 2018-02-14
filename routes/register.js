var router = require('express').Router(),
	bcrypt = require('bcrypt'),
	User = require('../models/userModel');


const { check, body ,validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

router.get('/', function(req, res, next) {
  res.render('register');
});

var handleRegistration = (req,res) =>{
	const errors = validationResult(req);

	if(!errors.isEmpty()){
		res.render('register', {errors: errors.mapped()});
	}else{
		const user = matchedData(req);
		delete user.password2;
		const saltRounds = 10;

		bcrypt.hash(user.password, saltRounds, function(error, hash) {
			if(error) throw error;

			user.password = hash;
  			User.create(user).then((user) =>{
  				req.login(user,(user)=>{
  					res.redirect('profile');
  				})
  			});
		});
	}
}

const findUserByEmail = (email) =>{
	return new Promise((resolve, reject) => {
		User.findOne({email: email}).then( (user) =>{
				if(user){
					resolve();
				}else{
					reject();
				}
			});
	});			
}

router.post('/', [

	body('name',"Must enter a correct name")
		.isLength({min:3})
		.isAlpha()
		.trim(),

	body('email')
		.isLength({min:3}).withMessage("Please enter an email address")
		.isEmail().withMessage("Please enter a valid email address")
		.custom((value) =>{	
			 return findUserByEmail(value).then( (taken) => {
			 	return false;
			 }).catch((error) => {
			 	return true;
			 });
		}).withMessage("reg")
		.trim()
		.normalizeEmail(),

	body('password')
		.isLength({min:1}).withMessage("Please enter a password")
		.matches(/^(?=.*[a-z])(?=.*\d).{8,}$/).withMessage("Password must contain at least 8 characters with at least one number")
		.trim(),

	body('password2')
		.isLength({min:1}).withMessage("Please enter re-enter your password")
		.custom((value,{req}) => value === req.body.password).withMessage("Passwords must match")
		


	] , handleRegistration);

module.exports = router;