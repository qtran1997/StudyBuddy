const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateNewClass(data) {
	let errors = {};

	data.course_type = !isEmpty(data.course_type) ? data.course_type : "";
	data.course_number = !isEmpty(data.course_number) ? data.course_number : "";
	data.title = !isEmpty(data.title) ? data.title : "";
	data.section = !isEmpty(data.section) ? data.section : "";
	data.schedule_number = !isEmpty(data.schedule_number)
		? data.schedule_number
		: "";
	data.units = !isEmpty(data.units) ? data.units : "";
	data.days = !isEmpty(data.days) ? data.days : [];
	data.instructor = !isEmpty(data.instructor) ? data.instructor : "";
	data.semester = !isEmpty(data.semester) ? data.semester : "";
	data.year = !isEmpty(data.year) ? data.year : "";

	if (Validator.isEmpty(data.course_type)) {
		errors.course_type = `Course Type is required`;
	}

	if (Validator.isEmpty(data.course_number)) {
		errors.course_number = `Course Number is required`;
	}

	if (Validator.isEmpty(data.title)) {
		errors.title = `Course Title is required`;
	}

	if (Validator.isEmpty(data.section)) {
		errors.section = `Course Section Number is required`;
	}

	if (Validator.isEmpty(data.schedule_number)) {
		errors.schedule_number = `Course Schedule Number is required`;
	}

	if (Validator.isEmpty(data.units)) {
		errors.units = `Course Units is required`;
	}

	if (Validator.isEmpty(data.days)) {
		errors.days = `Course Attendance Date(s) is required`;
	}

	if (Validator.isEmpty(data.instructor)) {
		errors.instructor = `Course Instructor name is required`;
	}

	if (Validator.isEmpty(data.semester)) {
		errors.semester = `Course Semester is required`;
	}

	if (Validator.isEmpty(data.year)) {
		errors.year = `Password field is required`;
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
