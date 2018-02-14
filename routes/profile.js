var router = require('express').Router();

const authMidWare = (req,res,next) => { 
	if(!req.user){
		res.redirect('login');
	}else{
		next();
	}
};

router.get('/', authMidWare, function(req, res, next) {
  res.render('profile', { name: req.user.username || req.user.name });
});



module.exports = router;