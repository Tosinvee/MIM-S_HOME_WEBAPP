const express = require('express');
const {getAllUsers,getUser,createUser,updateUser,deleteUser} = require('../controllers/userController');
const { signUp, login, protect } = require('../controllers/authController');
const router = express.Router()

router.post('/signup',signUp)
router.post('/login', login)

router
.route('/')
.get(protect, getAllUsers)
.post(createUser);

router
.route('/:id')
.get(getUser)
.patch(updateUser)
.delete(deleteUser)

module.exports = router;