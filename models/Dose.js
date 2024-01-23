const mongoose = require('mongoose');

const DoseSchema = new mongoose.Schema({

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
    },
    Checkup:{
        type: mongoose.Schema.ObjectId,
        ref: 'Checkup',
        required: true
    }

})

module.exports = mongoose.model('Dose', DoseSchema);