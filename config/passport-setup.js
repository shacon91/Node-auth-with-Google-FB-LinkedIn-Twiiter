var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	GoogleStrategy = require('passport-google-oauth20'),
	FacebookStrategy = require('passport-facebook').Strategy,
	LinkedInStrategy = require('passport-linkedin-oauth2').Strategy,
	TwitterStrategy = require('passport-twitter').Strategy,
	bcrypt = require('bcrypt');
	User = require('../models/userModel');
	

const dotenv = require('dotenv').config();


//dealing with tokens
passport.serializeUser((user,done) => { 
	done(null, user.id);
});


passport.deserializeUser((id,done) => {
	User.findById(id).then((user) =>{
		done(null,user);
	})
});


/*----- LOCAL STRATEGY ---------*/
passport.use( new LocalStrategy({
	usernameField:'email',
    passwordField:'password'
},
(username,password,done) => {
	User.findOne({email:username}).then((currentUser) => {
		if(currentUser){
			bcrypt.compare(password, currentUser.password, function(err, res) {
	   			if(res===true){
	   				done(null,currentUser);
	   			}else{
	   				done(null,false);
	   			}
			});
		}else{
			done(null,false);
		}
	})
}));


/*----- GOOGLE STRATEGY ---------*/
passport.use( new GoogleStrategy({
	clientID: process.env.G_clientId,
	clientSecret:process.env.G_clientSecret,
	callbackURL:'/login/google/redirect'
},
(accessToken,refreshToken,profile,done) => {
	//console.log(profile);
	User.findOne({googleId:profile.id}).then((currentUser) => {
		if(currentUser){
			done(null,currentUser);
		}else{
			new User({
				username: profile.displayName,
				googleId: profile.id
			}).save().then((newUser)=>{
				done(null,newUser);
			});
		}
	})
}));


/*----- FACEBOOK STRATEGY ---------*/
passport.use( new FacebookStrategy({
	clientID: process.env.FB_clientId,
	clientSecret:process.env.FB_clientSecret,
	callbackURL:'/login/facebook/redirect'
},
(accessToken,refreshToken,profile,done) => {
	//console.log(profile);
	User.findOne({facebookId:profile.id}).then((currentUser) => {
		if(currentUser){
			 done(null,currentUser);
		}else{
			new User({
				username: profile.displayName,
				facebookId: profile.id
			}).save().then((newUser)=>{
				done(null,newUser);
			});
		}
	})
}));

/*----- LINKEDIN STRATEGY ---------*/
passport.use( new LinkedInStrategy({
	clientID: process.env.LI_clientId,
	clientSecret:process.env.LI_clientSecret,
	callbackURL:'http://localhost:3000/login/linkedin/redirect',
	scope: ['r_emailaddress', 'r_basicprofile'],
  	state: true
},
(accessToken,refreshToken,profile,done) => {
	console.log(profile);
	User.findOne({linkedinId:profile.id}).then((currentUser) => {
		if(currentUser){
			 done(null,currentUser);
		}else{
			new User({
				username: profile.displayName,
				linkedinId: profile.id
			}).save().then((newUser)=>{
				done(null,newUser);
			});
		}
	})
}));

/*----- TWITTER STRATEGY ---------*/
passport.use( new TwitterStrategy({
	consumerKey: process.env.TW_clientId,
	consumerSecret:process.env.TW_clientSecret,
	callbackURL:'/login/twitter/redirect'
},
(token,tokenSecret,profile,done) => {
	console.log(profile);
	User.findOne({twitterId:profile.id}).then((currentUser) => {
		if(currentUser){
			 done(null,currentUser);
		}else{
			new User({
				username: profile.displayName,
				twitterId: profile.id
			}).save().then((newUser)=>{
				done(null,newUser);
			});
		}
	})
}));




