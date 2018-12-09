const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Profile Model
const Profile = require("../../models/Profile");

// Load User Model
const User = require("../../models/User");

// Load Messages model
const Messages = require("../../models/Messages");

// @route   GET api/messages/tests
// @desc    Test post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Messenger Works" }));

// @route   GET api/messages/user
// @desc    Get recent messages of the logged in user
// @access  Public
router.get(
    "/user",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const errors = {};

        Messages.find({
            $or: [
                {
                    user1: req.user.id
                },
                {
                    user2: req.user.id
                }
            ]
        })
            .then(messageArray => {
                res.json(messageArray);
            })
            .catch(err => {
                res.status(404).json(err);
            });
    }
);

// @route   GET api/messages/:userid
// @desc    Get messages
// @access  Public
router.get(
    "/user/:user_id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const errors = {};

        User.findById(req.params.user_id) //ID of the other user
            .then(user => {
                if (!user) {
                    errors.nouser = "This is not a valid user.";
                    return res.status(404).json(errors);
                }

                Messages.findOne({
                    $or: [
                        {
                            user1: req.user.id,
                            user2: req.params.user_id
                        },
                        {
                            user2: req.user.id,
                            user1: req.params.user_id
                        }
                    ]
                })
                    .then(messages => {
                        if (!messages) {
                            const newChat = new Messages({
                                user1: req.user.id,
                                user2: req.params.user_id,
                                messages: [],
                                recentMessageTime: Date.now()
                            });

                            newChat
                                .save()
                                .then(messages => res.json(messages))
                                .catch(err => res.json(err));
                            return;
                        }
                        res.json(messages);
                    })
                    .catch(err => res.status(404).json(err));
            })
            .catch(err => res.status(404).json(err));
    }
);

// @route   POST api/messages/:userid
// @desc    Send message
// @access  Private
router.post(
    "/user/:user_id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const errors = {};

        User.findById(req.params.user_id)
            .then(user => {
                if (!user) {
                    errors.nouser = "This is not a valid user.";
                    return res.status(404).json(errors);
                }

                Messages.findOneAndUpdate({
                    $or: [
                        {
                            user1: req.user.id,
                            user2: req.params.user_id
                        },
                        {
                            user2: req.user.id,
                            user1: req.params.user_id
                        }
                    ]
                })
                    .then(messages => {
                        if (!messages) {
                            const newChat = new Messages({
                                user1: req.user.id,
                                user2: req.params.user_id,
                                messages: [],
                                recentMessageTime: Date.now()
                            });

                            const newText = {
                                user: req.user.id,
                                fname: req.user.fname,
                                lname: req.user.lname,
                                avatar: req.user.avatar,
                                text: req.body.text
                            };

                            //Add chat message to NEW chat
                            newChat.messages.unshift(newText);
                            newChat
                                .save()
                                .then(messages => res.json(messages))
                                .catch(err => res.json(err));
                        } else {
                            const newText = {
                                user: req.user.id,
                                fname: req.user.fname,
                                lname: req.user.lname,
                                avatar: req.user.avatar,
                                text: req.body.text
                            };

                            //Add chat message to existing chat
                            messages.messages.unshift(newText);
                            messages.recentMessageTime = Date.now();
                            messages
                                .save()
                                .then(message => {
                                    res.json(message);
                                })
                                .catch(err => res.json(err));
                        }
                    })
                    .catch(err => {
                        res.status(404).json({
                            msg:
                                "I have no clue what the error is buddy. Good luck."
                        });
                    });
            })
            .catch(err => {
                res.status(404).json(err);
            });
    }
);
module.exports = router;
