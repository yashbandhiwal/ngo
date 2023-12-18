const mongoose = require('mongoose');

const AnimalDataSchema = new mongoose.Schema({

    petCode:{
        type: String,
        required:false,
        unique:true // will come from Animal code
    },
    petName:{
        type: String,
        required: [true, 'Please add a name']// will come from animal code
    },
    breed:{
        type:String,
        required:[true,'Please add breed']// will come from animal code
    },
    behaviour:{
        type:String,
        required:[true,'Please add behaviour']
    },
    health:{
        type:String,
        required:[true,'Please add health']
    },
    photo:[],
    dose:[{
        illness:{
            type:String // IllnessCode
        },
        medicine:{
            type:String // medicineCode
        }
    }],
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

module.exports = mongoose.model('Admindata', AnimalDataSchema);