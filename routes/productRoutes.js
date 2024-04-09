const express = require('express');
const {getAllProducts,getProduct,createProduct,updateProduct,deleteProduct} = require('../controllers/productContoller');
const { restrictTo, protect } = require('../controllers/authController');
const router = express.Router()

router.param('id', (req,res,next,val)=>{
    next()
})

router
.route('/')
.get(getAllProducts)
.post(createProduct);

router
.route('/:id')
.get(protect, restrictTo('admin', 'vendor'),getProduct)
.patch(protect, restrictTo('admin', 'vendor'), updateProduct)
.delete(protect, restrictTo('admin', 'vendor'), deleteProduct)

module.exports = router;