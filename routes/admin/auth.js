const express = require('express');
const {
  register,
} = require('../../controllers/admin/auth');

const router = express.Router();

router.post('/register', register);

module.exports = router;
