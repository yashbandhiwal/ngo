const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({

    name:{
        type:String,
        required: [true, 'Please add a name']
    },
    photo:{
        type:String,
        required: [true, 'Please add a photo']
    },
    prize:{
        type:String,
        required: [true, 'Please add a prize']
    },
    noOfDose:{
        type:String,
        required: [true, 'Please add a No. of dose']
    },
    manifactureDate:{
        type:String,
        required: [true, 'Please add a manifactuary date']
    },
    expiryDate:{
        type:String,
        required: [true, 'Please add a expiry date']
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})