var express = require("express");
var router = express.Router();
var User = require("../models/userSchema.js");
var Location = require("../models/locationSchema.js");
var Wine = require("../models/wineSchema.js");
var passport = require("passport");
var mongoose = require('mongoose');
mongoose.set('debug', true);


//********************
// GET REQUESTS
//********************


//LOGOUT
router.get('/:id/logout', function(req,res){
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

// // JSON
// router.get('/json', function(req, res) {
//     User.find({}, function(err, data) {
//         res.send(data);
//     });
// });  

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
//             }), function(req, res) {
//         res.redirect('/users/' + req.user.id);  //from passport.js
// });

//search results
router.post('/search', function(req, res){
    console.log("this is SEARCH: req.body.input ", req.body.input)
    res.send(req.body.input)
})

//new location
router.post('/:id/location', function(req, res){
    console.log('WORKING');
    console.log(req.params.id);
    console.log(req.body);   
    User.findById(req.params.id, function(err, user){
        var newLocation = new Location(req.body);
            console.log("new location ");
        newLocation.save(function(err){
            
        user.location.push(newLocation);
        // var bla = User.Location;
        //  bla.push(newLocation);
        console.log("new location added");
        //push location into locations.user
        //save user
        user.save(function(err, user){
             //send user to client
            res.send(user);
        });
        })
    });
})

//edit location
// router.put('/:id/location', function(req, res){
//         console.log(req.params.id);
//         Location.findByIdAndUpdate(req.params.id, req.body, function(err, user){
//     res.redirect('/users/' + req.params.id);
//     });
// });

//delete location
router.delete('/:id', function(req, res) {
    console.log('Deleted location');
    Location.findByIdAndRemove(req.params.id, function(err, data) {
        res.redirect('/');
    });
});

//this saves the selected wine and selected location to save to DB
router.post('/:id/addwine', function(req, res){
    console.log("ADDING WINE IS ACCESSED");
    console.log("this was the location id request: ", req.body.locationid);
    console.log("this was the wine request: ", req.body.wine);
    console.log("this was the wine request's NAME: ", req.body.wine.Name);

    User.findById(req.params.id, function(err, user){

        //     console.log("Found user: ", user);
            // console.log("Found location: ", location);
            var newWine = new Wine({
                name: req.body.wine.Name,
                url: req.body.wine.Url,
                onHand: 0,
                userId: req.params.id,
                type: req.body.wine.Varietal.Name
            })

            //save the new Wine
            newWine.save(function(err, wine){
                console.log("WINE WAS SAVED, CHECK MONGO")
             })//ends newWine.save

            console.log(user.location)

            //for every location this user has, push the wine into this location
            for (var i = 0; i < user.location.length; i++){
                if (user.location[i]._id == req.body.locationid){
                    user.location[i].wine.push(newWine);
                }
            }

            //save the user
            user.save();    

            
    })//ends find User by ID
})//ends router.post


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

router.put('/:id/:location_id', function(req,res){
    Location.findByIdAndUpdate(req.params.location_id, req.body, function(err,location){
        console.log(location.name);
        console.log(req.body);
        User.findById(req.params.id, function(err,user){
            console.log(user);
            console.log(user.location.length);
            for (var i = 0; i < user.location.length; i++) {
                if (user.location[i]._id == req.params.location_id) {
                    // user.location[i].name = req.body;
                    console.log('REQ BODY NAME ' + req.body.name);
                    console.log('USER NAME ' + user.location[i].name);
                    user.location[i].name = req.body.name;
                }
            }
            user.save(function(err){
                res.send(user);
            })
        });
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