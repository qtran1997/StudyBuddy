const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const AssistantSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: `users`
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = User = mongoose.model("assistants", AssistantSchema);
