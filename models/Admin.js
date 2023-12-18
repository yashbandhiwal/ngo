const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

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
        type: Number,
        required: [true, 'Please add an phone number'],
    },
    avatar:{
        type: String,
        required: false,
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

// Encrypt password using bcrypt
AdminSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
  
// Sign JWT and return
AdminSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });
};
  
// Match user entered password to hashed password in database
AdminSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
  
// Generate and hash password token
AdminSchema.methods.getResetPasswordToken = function() {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');
  
    // Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
  
    // Set expire
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
};

module.exports = mongoose.model('Admin', AdminSchema);