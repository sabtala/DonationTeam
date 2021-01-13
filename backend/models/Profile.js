const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const ProfileSchema = new Schema({
    // Associate user with the profile
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    profession: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }


});

module.exports = Profile = mongoose.model('profile', ProfileSchema);