const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema

const MessengerSchema = new Schema({
    user1: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    user2: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    messages: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "users",
                required: true
            },
            fname: {
                type: String,
                required: true
            },
            lname: {
                type: String,
                required: true
            },
            avatar: {
                type: String
            },
            text: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],

    date: {
        type: Date,
        default: Date.now
    },
    recentMessageTime: {
        type: Date,
        default: Date.now
    }
});

module.exports = Messsages = mongoose.model("messages", MessengerSchema);
