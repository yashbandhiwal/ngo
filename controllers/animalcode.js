const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const AnimalCode = require('../models/AnimalCode');
const randomstring = require("randomstring");
const path = require('path')
const formidable = require('formidable');
const fs = require('fs');

exports.createAnimal = asyncHandler(async(req,res,next) => {
    /**
     * @desc savig data of animal
     * @route POST api/v1/animalcode/createAnimal
     * @access private
     */

    let filenameOfProfile  = "";
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {

        const {
            petName,
            breed,
            behaviour,
            age,
            health,
            rehabitation
        } = fields

        let oldPath = files.photo[0].filepath;
        
        let newPath = path.join(__dirname,'../', 'public')
            + '/' + files.photo[0].newFilename + "" + files.photo[0].originalFilename
        
        let rawData = fs.readFileSync(oldPath)

        filenameOfProfile = files.photo[0].newFilename + "" + files.photo[0].originalFilename

        fs.writeFile(newPath, rawData, function (err) {
            if (err) return next(new ErrorResponse(`error: ${err}`, 400));
        })

        petCode = randomstring.generate(7);

        let code = await AnimalCode.create({
            petCode,
            petName:petName[0],
            breed:breed[0],
            behaviour:behaviour[0],
            photo:filenameOfProfile,
            age:age[0],
            health:health[0],
            rehabitation:rehabitation[0]
        })

        res.status(200).json({
            success:true,
            data:code
        })
    })


})


exports.updateAnimal = asyncHandler(async(req,res,next) => {

    /**
     * @desc update data of animal
     * @route PUT api/v1/animalcode/createAnimal
     * @access private
     */

    let {
        petName,
        breed,
        behaviour,
        age,
        health,
        rehabitation,
        id
    } = req.body

    if(id)
    return next(new ErrorResponse(`Id is not defined`, 404));

    let animalExist = await AnimalCode.findById(id)
    if(animalExist)
    return next(new ErrorResponse(`No animal found with the id ${id}`, 404));

    obj = {}

    if(petName)
    obj.petName = petName
    
    if(breed)
    obj.breed = breed
    
    if(behaviour)
    obj.behaviour = behaviour
    
    if(age)
    obj.age = age
    
    if(health)
    obj.health = health
    
    if(rehabitation)
    obj.rehabitation = rehabitation

    obj.updatedAt = Date.now()

    let updateAnimal = await AnimalCode.findByIdAndUpdate({
        id:id
    },{
        $set:obj
    })

    res.status(200).json({
        success:true,
        data:updateAnimal
    })

})