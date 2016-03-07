var express = require("express");
var router = express.Router();
var User = require("../models/userSchema.js");
// var Location = require("../models/locationsSchema.js");
var passport = require("passport");
var mongoose = require('mongoose');
mongoose.set('debug', true);


//********************
// GET REQUESTS
//********************


//LOGOUT
router.get('/logout', function(req,res){
    console.log("LOGGED OUT!");
    req.logout();
    res.redirect('/');
});

//WORK ON THIS
// router.get('/validate', function(req, res) {
//     if (req.isAuthenticated()) {
//         res.redirect('/users/' + req.user.id);
//     } else {
//         res.redirect('/users');
//     }
// });

// JSON
router.get('/json', function(req, res) {
    User.find({}, function(err, data) {
        res.send(data);
    });
});  

//HOMEPAGE
router.get("/:id", function(req, res){
    User.findById(req.params.id, function(err, user){
        console.log(user);
        res.send(user)
    })
});
// router.get("/:id", function(req, res) {
//     //if user logged in matches req.params.id
//     // res.locals.login = req.isAuthenticated();
//         //find THAT user by ID
//         console.log("This is the req.params.id", req.params.id)
//         User.findById(req.params.id, function(err, data) { //curlies?
//             //send back user object
//             res.send(data);
//             console.log("This is the user", data);
//         });
// });

//********************
// CREATE 
//********************
//Post new user
router.post('/signup', passport.authenticate('local-signup', {
    failureRedirect : '/TESTPAGE' // redirect to the signup page if error
            }), function(req, res) {
        console.log('SIGNUP AUTHENTICATION WORKED');
        res.send(req.user);
        console.log("This is req.user being sent back to page", req.user)  //from passport.js
});


//login
router.post('/login', passport.authenticate('local-login',{
    failureRedirect: '/TESTPAGE'}), function(req,res){
    console.log('LOGGGED IN, YA');
    res.send(req.user);
});

//Post new user
// router.post('/', passport.authenticate('local-signup', {
//     failureRedirect : '/users' // redirect to the signup page if error
// 			}), function(req, res) {
//     	res.redirect('/users/' + req.user.id);  //from passport.js
// });

//search results
router.post('/search', function(req, res){
    console.log("this is SEARCH: req.body.input ", req.body.input)
    res.send(req.body.input)
})

//********************
// UPDATE
//********************

//Put/edit username
router.put('/:id', function(req, res) {
    var newUserName = req.body;
    //     console.log("newUserName", newUserName);
    //     console.log('req.body.username: ', req.body.username);
            User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
    res.redirect('/users/' + req.params.id);
    });
});

//********************
// DELETE
//********************

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