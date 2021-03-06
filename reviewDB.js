const mongoose = require('mongoose');

const credentials = require("./credentials.js");

const dbUrl = 'mongodb+srv://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + '/' + credentials.database +
	'?retryWrites=true&w=majority';

let connection = null;
let model = null;

let Schema = mongoose.Schema;

// schema definition for review database
let reviewSchema = new Schema({
	reviewer: String,
	category: String,
	subject: String,
	body: String,
	rating: Number
}, {
	collection: 'reviews_choy'
});

module.exports = {	
	getModel: () => {
		if (connection == null) {
			console.log("Creating connection and model...");
			connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
			model = connection.model("ReviewModel",
				reviewSchema);
		};
		return model;
	}
};
