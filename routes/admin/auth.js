const express = require('express');
const {
  register,
  login,
  logout,
  getMe,
  updateDetails,
  updatePassword,
  forgotPassword,
  resetPassword
} = require('../../controllers/admin/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout',logout);
router.get('/getme',getMe);
router.get('/updateDetails',updateDetails);
router.get('/updatePassword',updatePassword);
router.get('/forgotPassword',forgotPassword);
router.get('/resetPassword',resetPassword);

module.exports = router;
