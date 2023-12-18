const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    name:{
        type: String,
        required: [true, 'Please add a name']
    },
    email:{
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
        ]
    },
    countryCode:{
        type: String,
        required: [true, 'Please add an country code'],
    },
    phoneNumber:{
        type: String,
        required: [true, 'Please add an phone number'],
    },
    avatar:{
        type: String,
        required: [true, 'Please add an avatar'],
    },
    role:{
        type: String,
        enum: ['owner','care_tacker'],
        default: 'care_tacker' //one is the lowest teir
    },
    password:{
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    },
    verifiedEmail:{
        type:Boolean,
        default:false
    },
    verifiedPhone:{
        type:Boolean,
        default:false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    address:{
        type: String,
        required: [true, 'Please add an address'],
    },
    state:{
        type: String,
        required: [true, 'Please add an state'],
    },
    country:{
        type: String,
        required: [true, 'Please add an country'],
    },
    createdAt:{
        type: Date,
        default:Date.now
    },

})

module.exports = mongoose.model('User', UserSchema);