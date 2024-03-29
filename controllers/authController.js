const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    // passwordResetExpires: req.body.passwordResetExpires,
     role: req.body.role
  });

  const token = signToken(newUser._id);

  res.status(200).json({
    status: "sucess",
    token,
    data: {
      user: newUser,
    },
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //check if email or password exists
  if (!email || !password) {
    return next(new AppError("provide a valid email and password", 400));
  }
  // check if check if email and password are valid
  const user = await User.findOne({ email }).select("+password");
  // checks if users exist then compares the newpassword and the hashed password
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("incorrect email or password", 401));
  }

  //if all is okay
  const token = signToken(user._id);
  res.status(200).json({
    status: "sucess",
    token,
  });
});

const protect = catchAsync(async (req, res, next) => {
  // Getting token and check of its there
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  //console.log(token)

  if (!token) {
    return next(
      new AppError("you are not logged in!please log in to get access", 401)
    );
  }

  // verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError("The user belonging to this token no longer exist", 401)
    );
  }
  // check if user changed password after the token was issued

 if (freshUser.changedPasswordAfter(decoded.iat)) {
  return next(new AppError('User recently changed password! please log in again.', 401))
 }
//GRANT ACCESS TO THE PROTECTED ROUTE
req.user = freshUser
  next();
});

const restrictTo = (...roles) =>{
  return (req,res,next) =>{
    if(!roles.includes(req.user.role)){
      return next(new AppError('you do not have the permission to perform this operation', 403))
    }
    next()
  }
} 

const forgotPassword =catchAsync(async (req,res,next)=>{
  const user = await User.findOne({email:req.body.email})
// Get user based on posted email
  if(!user){
    return next(new AppError('There is no user with email address', 404))
  }
  // generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({validateBeforeSave: false}) // to help pass validation rules before saving
})

module.exports = { signUp, login, protect, restrictTo , forgotPassword};
