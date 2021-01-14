
const validator = require('express-validator');
const Validator = require('validator');
const isEmpty = require("./is-empty");
// we cant use isEmpty from validator pkg as it needs its param to be a string

// data is req.body
module.exports = function validateProfileInput(data) {
    let errors = {};

    
    data.profession = isEmpty(data.profession) ? "" : data.profession;
    data.location = isEmpty(data.location) ? "" : data.location;
   

    if (!Validator.isLength(data.profession, {min: 2, max: 40})){
        errors.profession = 'Profession need to be between 2 and 40 characthers';
    }

    if (Validator.isEmpty(data.profession)){
        errors.profession = 'Profile profession is required';
    };

    if (Validator.isEmpty(data.location)){
        errors.location = 'Profile location is required';
    }

    return { errors, isValid: isEmpty(errors) };
};

