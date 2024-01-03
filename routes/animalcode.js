const express = require('express');
const {
  createAnimal,
  updateAnimal,
  getAnimal,
  uploadPic,
  list
} = require('../controllers/animalcode');

const { protect } = require('../middleware/auth')

const router = express.Router();

router.post('/createAnimal', createAnimal);
router.put('/updateAnimal',updateAnimal)
router.get('/getAnimal/:id',getAnimal)
router.put('/uploadPic/:id',uploadPic)
router.get('/list',list)

module.exports = router;
