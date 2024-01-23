const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const AnimalCode = require('../models/AnimalCode');
const formidable = require('formidable');
const ObjectId = require('mongodb').ObjectId;
const AnimalMood = require("../models/AnimalMood")
const path = require('path')
const fs = require('fs');


/**
 * @desc saveing moods
 * @route POST api/v1/animalmood/createmood
 * @access private
 */

/**
 * @desc updating moods
 * @route PUT api/v1/animalmood/updatemood/:id
 * @access private
 */

/**
 * @desc deleting moods
 * @route DELETE api/v1/animalmood/delete/:id
 * @access private
 */

/**
 * @desc get one
 * @route GET api/v1/animalmood/getone/:id
 * @access private
 */

/**
 * @desc get list
 * @route GET api/v1/animalmood/getlist
 * @access private
 */
