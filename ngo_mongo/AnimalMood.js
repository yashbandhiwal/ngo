const mongoose = require('mongoose');

const AnimalMoodSchema = new mongoose.Schema({

    mood:{
        type: String,
        enum: ['rad', 'good', 'meh', 'happy','bad','awful'],
        default: 'meh' //one is the lowest teir
    },
    food:{
        type: String,
        enum: ['weight_one','weight_two','weight_three','delight_one','delight_two'],
        default: 'weight_one' //one is the lowest weight_one
    },
    edited:{
        type:Boolean,
        default:false
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