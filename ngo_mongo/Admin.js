const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({

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
        enum: ['teir_one', 'teir_two', 'teir_three'],
        default: 'teir_one' //one is the lowest teir
    },
    password:{
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
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