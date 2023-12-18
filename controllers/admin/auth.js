const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const User = require('../../models/Admin');


/*
* @desc      Register admin
* @route     POST /api/v1/admin/auth/register
* @access    Public
**/
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, countryCode, phoneNumber, password, role, address, state, country } = req.body;

  // Create user
  const user = await User.create({
    name, 
    email, 
    countryCode, 
    phoneNumber, 
    password, 
    role, 
    address, 
    state, 
    country
  });

  sendTokenResponse(user, 200, res);
});


// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();
  
    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };
  
    if (process.env.NODE_ENV === 'production') {
      options.secure = true;
    }
  
    res
      .status(statusCode)
      .cookie('token', token, options)
      .json({
        success: true,
        token
      });
};