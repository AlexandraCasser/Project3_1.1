var express = require("express");
var router = express.Router();
var User = require("../models/userSchema.js");
// var Location = require("../models/locationsSchema.js");
var passport = require("passport");


//Get
router.get("/", function(req, res) {
		res.locals.login = req.isAuthenticated();
			User.find({} function(err, data) { //curlies?
				res.send(user);
			});
		});


router.get('/validate', function(req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/users/' + req.user.id);
    } else {
        res.redirect('/users');
    }
});


//Post new user
router.post('/', passport.authenticate('local-signup', {
    failureRedirect : '/users' // redirect to the signup page if error
			}), function(req, res) {
    	res.redirect('/users/' + req.user.id);  //from passport.js
});

// JSON
router.get('/json', function(req, res) {
    User.find({}, function(err, data) {
        res.send(data, {
            users: data
        });
    });
});  

//Put/edit username
router.put('/:id', function(req, res) {
    var newUserName = req.body;
    //     console.log("newUserName", newUserName);
    //     console.log('req.body.username: ', req.body.username);
            User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
    res.redirect('/users/' + req.params.id);
    });
});


//Delete user
router.delete('/:id', function(req, res) {
    console.log('Deleted user');
    User.findByIdAndRemove(req.params.id, function(err, data) {
        res.redirect('/');
    });
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    //if user exists, do this
    if (req.isAuthenticated())
        return next();
    // if not
    res.redirect('/');
};

module.exports = router;