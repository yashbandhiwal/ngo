const mongoose = require('mongoose');

const AnimalMoodSchema = new mongoose.Schema({

    AnimalId:{
        type: mongoose.Schema.ObjectId,
        ref: 'Animalcode',
        required: true
    },
    mood:{
        type: String,
        enum: ['rad', 'good', 'meh', 'happy','bad','awful'],
        default: 'meh' //one is the lowest teir
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

module.exports = mongoose.model('Animalmood', AnimalMoodSchema);