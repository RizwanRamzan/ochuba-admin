const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        default:''
    },
    lastName:{
        type:String,
        default:''
    },
    email: {
        type: String,
        required: [true, 'Please add email'],
        match: [
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            'Please add a valid email'
        ],
        unique: [true, "This email already exists"],
        lowercase: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },
    company: {
        type: String,
        default: ''
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdminRoles',
        default: ''
    },
    userGroup: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserGroup'
    }],
    password: {
        type: String,
        required: [true, "Please provide password"]
    },
    profilePhoto:{
        type:String,
        default:''
    }
})

module.exports = mongoose.model('User', userSchema);
