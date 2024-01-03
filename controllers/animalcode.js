const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const AnimalCode = require('../models/AnimalCode');
const randomstring = require("randomstring");
const path = require('path')
const formidable = require('formidable');
const fs = require('fs');
const ObjectId = require('mongodb').ObjectId;

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

    if(!id)
    return next(new ErrorResponse(`Id is not defined`, 404));

    let animalExist = await AnimalCode.findById(id)
    if(!animalExist)
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

    let data = await AnimalCode.findByIdAndUpdate({
        _id:new ObjectId(id)
    },{
        $set:obj
    },{
        upsert:true, 
        // returnNewDocument : true,
        returnDocument: "after"
    })

    res.status(200).json({
        success:true,
        data:data
    })

})

exports.getAnimal = asyncHandler(async(req,res,next) => {

    /**
     * @desc get
     * @route GET api/v1/animalcode/getAnimal/:id
     * @access private
     */

    let {
        id
    } = req.params

    let data = await AnimalCode.findById(id)

    res.status(200).json({
        success:true,
        data:data
    })

})

exports.uploadPic = asyncHandler(async(req,res,next) => {
    /**
     * @desc upload pic
     * @route put api/v1/animalcode/uploadpic/:id
     * @access private
     */

    let filenameOfProfile  = "";
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {

        let {
            id
        } = req.params

        let animalExist = await AnimalCode.findById(id)
        if(!animalExist)
        return next(new ErrorResponse(`Animal data is not there`, 404));

        let filedes = path.join(__dirname,'../', 'public') + '/' + animalExist.photo

        if(animalExist.photo){
            if(fs.existsSync(filedes))
            fs.unlinkSync(path.join(__dirname,'../', 'public') + '/' + animalExist.photo)
        }

        let oldPath = files.photo[0].filepath;
        
        let newPath = path.join(__dirname,'../', 'public')
            + '/' + files.photo[0].newFilename + "" + files.photo[0].originalFilename
        
        let rawData = fs.readFileSync(oldPath)

        filenameOfProfile = files.photo[0].newFilename + "" + files.photo[0].originalFilename

        fs.writeFile(newPath, rawData, function (err) {
            if (err) return next(new ErrorResponse(`error: ${err}`, 400));
        })


        let code = await AnimalCode.findByIdAndUpdate({
            _id:new ObjectId(id)
        },
        {
            $set:{
                photo:filenameOfProfile
            }
        },
        {
            // returnNewDocument : true,
            returnDocument: "after"
        })

        res.status(200).json({
            success:true,
            data:code
        })
    })
})


exports.list = asyncHandler(async(req,res,next) => {

    /**
     * @desc get list
     * @route GET api/v1/animalcode/list
     * @access private
     */


    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await AnimalCode.countDocuments();

    let query = await AnimalCode.aggregate([
        {
            $match:{}
        },
        {
            $skip:startIndex
        },
        {
            $limit:limit
        }
    ])

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
        pagination.next = {
        page: page + 1,
        limit
        };
    }

    if (startIndex > 0) {
        pagination.prev = {
        page: page - 1,
        limit
        };
    }

    let advancedResults = {
        success: true,
        count: query.length,
        pagination,
        data: query
    };
    
    res.status(200).json({
        success:true,
        data:advancedResults
    })

})