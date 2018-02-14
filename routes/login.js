var router = require('express').Router(),
	passport = require('passport');

router.get('/', function(req, res, next) {
  res.render('login');
});

/*----- LOCAL LOGIN ---------*/
router.post('/',passport.authenticate("local", {
		successRedirect:'/profile',
		failureRedirect:'/login'
}));


/*----- GOOGLE LOGIN ---------*/
router.get('/google',passport.authenticate("google",{
		scope:['profile']
}));

router.get('/google/redirect',passport.authenticate('google'), (req,res)=>{
		//console.log(req.user);
		res.redirect('/profile');
});

/*----- FACEBOOK LOGIN ---------*/
router.get('/facebook',passport.authenticate("facebook"));

router.get('/facebook/redirect',passport.authenticate("facebook"), (req,res)=>{
		//console.log(req.user);
		res.redirect('/profile');
});

/*----- LINKEDIN LOGIN ---------*/
router.get('/linkedin',passport.authenticate("linkedin"));

router.get('/linkedin/redirect',passport.authenticate("linkedin"), (req,res)=>{
		//console.log(req.user);
		res.redirect('/profile');
});

/*----- TWITTER LOGIN ---------*/
router.get('/twitter',passport.authenticate("twitter"));

router.get('/twitter/redirect',passport.authenticate("twitter"), (req,res)=>{
		//console.log(req.user);
		res.redirect('/profile');
});


module.exports = router;