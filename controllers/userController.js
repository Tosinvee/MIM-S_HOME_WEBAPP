const Joi = require("joi");
const User = require("../models/usersModel");
const catchAsync = require("../utils/catchAsync");
//const { v4: uuidv4 } = require('uuid')

const getAllUsers = catchAsync(async (req, res) => {
    const users = await User.find();
    res.status(200).json({
      status: "sucess",
      data: {
        users,
      },
    });
});

const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "on the way",
  });
};

const createUser = catchAsync(async (req, res) => {
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
const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "on the way",
  });
};

// const userValidation = Joi.object({
//     email:Joi.string().email().required(),
//     password: Joi.string().required(),
//     confirmPassword: Joi.ref("password")

//})
//userValidation.validate(r)
module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };
