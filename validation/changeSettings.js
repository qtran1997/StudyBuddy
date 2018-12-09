const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function changeSettings(data) {
    let errors = {};

    data.username = !isEmpty(data.username) ? data.username : "";
    data.fname = !isEmpty(data.fname) ? data.fname : "";
    data.lname = !isEmpty(data.lname) ? data.lname : "";

    if (!isEmpty(data.username)) {
        if (!Validator.isLength(data.username, { min: 5, max: 18 })) {
            errors.username = "Username must be between 5 and 18 characters.";
        }
    }
    if (!isEmpty(data.fname)) {
        if (!Validator.isLength(data.fname, { min: 2, max: 30 })) {
            errors.fname = "Name must be between 2 and 30 characters.";
        }
    }
    if (!isEmpty(data.lname)) {
        if (!Validator.isLength(data.lname, { min: 2, max: 30 })) {
            errors.lname = "Name must be between 2 and 30 characters.";
        }
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
