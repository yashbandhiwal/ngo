const mongoose = require('mongoose');

const CheckUpSchema = new mongoose.Schema({

    petCode:{
        type:String,
    },
    petName:{
        type:String,
    },
    health:{
        type:String,
    },
    illness:{
        type:String,
    },
    medicineId:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Medicine',
        required: true
    }],


})

module.exports = mongoose.model('Checkup', CheckUpSchema);