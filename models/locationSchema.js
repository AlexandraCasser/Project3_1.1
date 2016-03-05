var mongoose = require("mongoose");
var wineSchema = require("./wineSchema.js").schema;

var locationSchema = new mongoose.Schema({

	name: String,
	userId: String,
	wine: [wineSchema]

});

module.exports = mongoose.model("locationSchema", locationSchema);