const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateProfileInput = require('../../validation/profile');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');


// route:  GET api/profile/test
// desc:   Test profile route
// access: Public
router.get('/test', (req,res) => res.json({msg: "Profile works"}));

// route:  GET api/profile
// desc:   Get current users profile
// access: Private

router.get('/', passport.authenticate('jwt', { session: false}), (req, res) => {
    const errors = {};

    Profile.findOne({user: req.user.id})
    .then(profile => {
        if(!profile){
            errors.noprofile = 'There is no profile for this user';
            return res.status(404).json(errors);
        }
        res.json(profile);
    })
    .catch(err => res.status(404).json(err));

});

// route:  GET api/profile/test
// desc:   Test profile route
// access: Public
router.get('/test', (req,res) => res.json({msg: "Profile works"}));

// route:  POST api/profile
// desc:   Create or edit user profile
// access: Private

router.post(
    '/', 
    passport.authenticate('jwt', { session: false}), (req, res) => {
    const {errors, isValid} = validateProfileInput(req.body);

        // check Validation
        if(!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
        }

        // Get fields
        const profileFields = {};
        profileFields.user = req.user.id;
        if(req.body.profession) profileFields.profession = req.body.profession;
        if(req.body.location) profileFields.location = req.body.location;

        Profile.findOne({user: req.user.id})
            .then(profile => {
                if(profile) {
                    //Update
                    Profile.findOneAndUpdate(
                        {user: req.user.id}, 
                        {$set: profileFields},
                        {new: true}
                        )
                        .then(profile => res.json(profile));
                    } else {
                        // check if location exists
                        Profile.findOne({location: profileFields.location}).then(profile => {
                            if(profile){
                                errors.location = 'That location already exists';
                                res.status(400).json(errors);
                            }

                            // save Profile
                            new Profile(profileFields).save().then(profile => res.json(profile));
                        });

                    }
                });
            }

);

module.exports = router;