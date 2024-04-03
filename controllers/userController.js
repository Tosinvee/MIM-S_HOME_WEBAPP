const Joi = require("joi");
const User = require("../models/usersModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/appError')
//const { v4: uuidv4 } = require('uuid')

//looping through all the fields in the object
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  //and for each field we check if its one of the allowed field
  Object.keys(obj).forEach(el =>{
    //and if it is we create a new field in the new object
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj
}

const getAllUsers = catchAsync(async (req, res,next) => {
    const users = await User.find();
    res.status(200).json({
      status: "sucess",
      data: {
        users,
      },
    });
});

const updateMe = catchAsync(async(req,res,next)=>{
  //filtered out unwanted field name that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name','email')
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {new: true, runValidators:true}) 

  res.status(200).json({
    status:'sucess',
    data:{
      user: updatedUser
    }
})
})


const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "on the way",
  });
};

const createUser = catchAsync(async (req, res,next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordconfirm,
    role: req.body.role,
  });

  res.status(200).json({
    status: "sucess",
    data: {
      user: newUser,
    },
  });
});

const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "on the way",
  });
};
// const deleteUser = (req, res) => {
//   res.status(500).json({
//     status: "error",
//     message: "on the way",
//   });
// };

const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});


// const userValidation = Joi.object({
//     email:Joi.string().email().required(),
//     password: Joi.string().required(),
//     confirmPassword: Joi.ref("password")

//})
//userValidation.validate(r)
module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser ,updateMe};
