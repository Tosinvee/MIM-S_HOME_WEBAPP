const express = require('express');
const {getAllUsers,getUser,createUser,updateUser,deleteUser} = require('../controllers/userController');
const { signUp, login, protect, restrictTo, forgotPassword, resetPassword, updatePassword } = require('../controllers/authController');
const router = express.Router()

router.post('/signup',signUp)
router.post('/login', login)
router.post('/forgotPassword', forgotPassword)
router.patch('/resetPassword/:token', resetPassword)
router.patch('/updateMyPassword', updatePassword)

router
.route('/')
.get(protect, getAllUsers)
.post(createUser);

router
.route('/:id')
.get(getUser)
.patch(updateUser)
.delete(protect, restrictTo('admin', 'vendor'), deleteUser)

module.exports = router;