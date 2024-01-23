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
    AnimalId:{
        type: mongoose.Schema.ObjectId,
        ref: 'Animalcode',
        required: true
    }

})

module.exports = mongoose.model('Checkup', CheckUpSchema);