const mongoose = require('mongoose');

const IllnessSchema = new mongoose.Schema({

    petCode:{
        type:String,
    },
    petName:{
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
    AnimalId:{
        type: mongoose.Schema.ObjectId,
        ref: 'Animalcode',
        required: true
    }

})

module.exports = mongoose.model('Illness', IllnessSchema);