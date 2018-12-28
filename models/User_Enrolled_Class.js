const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserEnrolledClassSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: `users`
	},
	class: {
		type: Schema.Types.ObjectId,
		ref: `classes`
	},
	date_enrolled: {
		type: Date,
		default: Date.now
	}
});

module.exports = User = mongoose.model(
	"users_enrolled_classes",
	UserEnrolledClassSchema
);
