var mongoose = require("mongoose");

var wineSchema = new mongoose.Schema({

	name: String, //object.products.list.name
	url: String, //object.products.list.url
	onHand: Number,
	userId: String,
	type: String //object.products.list.varietal.name

});

module.exports = mongoose.model("wineSchema", wineSchema);