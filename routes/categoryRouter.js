const express = require('express');
const { getCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/catergoryController');
const { restrictTo, protect } = require('../controllers/authController');
const router = express.Router()

 router
 .route('/')
 .get(getCategories)
 .post(createCategory);

 router
.route('/:id')
.patch(protect, restrictTo('admin', 'vendor'), updateCategory)
.delete(protect, restrictTo('admin', 'vendor'), deleteCategory)

module.exports = router;