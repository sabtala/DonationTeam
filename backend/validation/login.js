
const validator = require('express-validator');
const Validator = require('validator');
const isEmpty = require("./is-empty");
// we cant use isEmpty from validator pkg as it needs its param to be a string

// data is req.body
module.exports = function validateLoginInput(data) {
    let errors = {};

    
    data.email = isEmpty(data.email) ? "" : data.email;
    data.password = isEmpty(data.password) ? "" : data.password;
   

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }

    // runs if not in email exists but not in format
    if (!Validator.isEmpty(data.email) && !Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    return { errors, isValid: isEmpty(errors) };
};

