const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSignUpSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mobileno: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    cpassword: {
        type: String,
        required: true
    },

    imgUrl: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('AdminSignUp', adminSignUpSchema);