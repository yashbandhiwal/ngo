const mongoose = require('mongoose');

const AnimalCodeSchema = new mongoose.Schema({

    petCode:{
        type: String,
        required:false,
        unique:true //randomly generated string of string carry breed and name payload
    },
    petName:{
        type: String,
        required: [true, 'Please add a name']
    },
    breed:{
        type:String,
        required:[true,'Please add breed']
    },
    photo:{
        type:String,
        required:[true,'Please add photo']
    },
    behaviour:{
        type:String,
        required:[true,'Please add behaviour']
    },
    age:{
        type:String,
        required:[true,'Please add age']
    },
    health:{
        type:String,
        required:[true,'Please add health']
    },
    rehabitation:{
        type: String,
        enum: ['shelter','kill','take_care','nil'],
        default: 'nil'
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

module.exports = mongoose.model('Admincode', AnimalCodeSchema);