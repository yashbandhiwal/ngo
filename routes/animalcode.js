const express = require('express');
const {
  createAnimal,
  updateAnimal,
  getAnimal,
  uploadPic
} = require('../controllers/animalcode');

const { protect } = require('../middleware/auth')

const router = express.Router();

router.post('/createAnimal', createAnimal);
router.put('/updateAnimal',updateAnimal)
router.get('/getAnimal/:id',getAnimal)
router.put('/uploadPic/:id',uploadPic)

module.exports = router;
