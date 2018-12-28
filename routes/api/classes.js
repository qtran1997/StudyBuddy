const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const keys = require("../../config/keys");
const passport = require("passport");

// Load Input Validation
const addClass = require("../../validation/add-class");

// Load User model
const User = require("../../models/User");
const Classes = require("../../models/Class");

// @route   GET api/classes/tests
// @desc    Test classes route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Classes Works" }));

// @route   POST api/classes/new
// @desc    Add class to database
// @access  Private
router.post(
	"/new",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		let newClass = new Classes({
			course_type: req.body.course_type,
			course_number: req.body.course_number,
			title: req.body.title,
			section: req.body.section,
			schedule_number: req.body.schedule_number,
			units: req.body.units,
			instructor: req.body.instructor,
			semester: req.body.semester,
			year: req.body.year
		});

		if (typeof req.body.days !== "undefined") {
			newClass.days = req.body.days.split(",");
		}

		Classes.findOne({
			schedule_number: newClass.schedule_number
		})
			.then(classes => {
				// If class does not exist, add it
				if (!classes) {
					newClass
						.save()
						.then(Class => {
							res.json(Class);
						})
						.catch(err => res.json(err));
				} else {
					// Class exists
					res.json(classes);
				}
			})
			.catch(err => res.json(err));
	}
);

module.exports = router;
