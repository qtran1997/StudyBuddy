const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load Input Validation
const changeSettings = require("../../validation/changeSettings");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");
const Profile = require("../../models/User");

// @route   GET api/users/tests
// @desc    Test users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   POST api/users/register
// @desc    Register users
// @access  Public
router.post("/register", (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);

	// Check Validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.find({
		$or: [{ email: req.body.email }, { username: req.body.username }]
	})
		.then(user => {
			if (user.length != 0) {
				user.forEach(user => {
					if (user.email == req.body.email)
						errors.email = "Email already exists";
					if (user.username == req.body.username)
						errors.username = "Username already exists";
				});

				console.log(user);

				return res.status(400).json(errors);
			} else {
				const avatar = gravatar.url(req.body.email, {
					s: "200", //SIZE
					r: "pg", //Rating
					d: "mm" //Default
				});

				const newUser = new User({
					username: req.body.username,
					fname: req.body.fname,
					lname: req.body.lname,
					email: req.body.email,
					avatar,
					password: req.body.password
				});

				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if (err) throw err;
						newUser.password = hash;
						newUser
							.save()
							.then(user => res.json(user))
							.catch(err => res.json(err));
					});
				});
			}
		})
		.catch(err => console.log(err));
});

// @route   POST api/users/login
// @desc    Login users
// @access  Public
router.post("/login", (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);
	console.log(req.body);
	// Check Validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const username = req.body.username;
	const password = req.body.password;
	// Find user by username
	User.findOne({ username: { $regex: new RegExp(username, "i") } })
		.then(user => {
			// Check for user
			if (!user) {
				errors.username = "User not found";
				return res.status(404).json(errors);
			}

			// Check password
			bcrypt.compare(password, user.password).then(isMatch => {
				if (isMatch) {
					// User matched

					const payload = {
						id: user.id,
						username: user.username,
						fname: user.fname,
						lname: user.lname,
						avatar: user.avatar,
						registeredProfile: user.profileSetup
					};

					// Sign Token
					jwt.sign(
						payload,
						keys.secretOrKey,
						{ expiresIn: 3600 },
						(err, token) => {
							res.json({
								success: true,
								token: "Bearer " + token
							});
						}
					);
				} else {
					errors.password = "Password incorrect";
					return res.status(400).json(errors);
				}
			});
		})
		.catch(err => console.log(err));
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
	"/current",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		res.json({
			id: req.user.id,
			username: req.user.username,
			fname: req.user.fname,
			lname: req.user.lname,
			email: req.body.email
		});
	}
);

// @route   POST api/users/change-settings
// @desc    Register users
// @access  Public
router.post(
	"/change-settings",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { errors, isValid } = changeSettings(req.body);

		let successes = {};
		// Check Validation
		// if (!isValid) {
		//     return res.status(400).json(errors);
		// }

		User.findById(req.user.id)
			.then(user => {
				if (user) {
					if (req.body.username) {
						User.findOne({ username: req.body.username })
							.then(foundUser => {
								if (foundUser) {
									errors.username =
										"This username is already in use!";
								} else {
									user.username = req.body.username;
									successes.username =
										"Successfully changed your username!";
								}

								if (req.body.fname) {
									user.fname = req.body.fname;
									successes.fname =
										"Successfully changed your first name!";
								}
								if (req.body.lname) {
									user.lname = req.body.lname;
									successes.lname =
										"Successfully changed your last name!";
								}
								user.save()
									.then(user => {
										return res.json({ successes, errors });
									})
									.catch(err => {
										console.log(err);
									});
							})
							.catch(err => console.log(err));
					}
				}
			})
			.catch(err => console.log(err));
	}
);

// @route   POST api/users/change-password-settings
// @desc    Register users
// @access  Public
router.post("/change-password-settings", (req, res) => {
	const { errors, successes, isValid } = validateRegisterInput(req.body);

	// Check Validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findById(req.user.id)
		.then(user => {
			if (user) {
			}
		})
		.catch(err => console.log(err));
});

module.exports = router;
