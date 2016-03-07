// var express    = require('express');
// var router     = express.Router();
// var User       = require('../models/userSchema.js');
// var Location   = require('../models/locationSchema.js');
// var passport   = require('passport'); 



// // INDEX
// router.get('/', function(req, res) {
// 	Location.find({}, function(err, data) {
// 		res.render('location/index.ejs', {
// 			location: data
// 		});
// 	});
// });


// // JSON ROUTE
// router.get('/json', function(req, res) {
// 	Location.find({}, function(err, data) {
// 		res.send(data);
// 	});
// });


// module.exports = router;