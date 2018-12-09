const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    fname: {
        type: String,
        require: true
    },
    lname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    avatar: {
        type: String
    },
    profileSetup: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model("users", UserSchema);
