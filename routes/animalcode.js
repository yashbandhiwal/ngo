const express = require('express');
const {
  createAnimal,
  updateAnimal
} = require('../controllers/animalcode');

const { protect } = require('../middleware/auth')

const router = express.Router();

router.post('/createAnimal', protect, createAnimal);
router.put('/updateAnimal',updateAnimal)

module.exports = router;
