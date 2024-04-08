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
.get(protect, restrictTo,getProduct)
.patch(protect, restrictTo, updateProduct)
.delete(protect, restrictTo, deleteProduct)

module.exports = router;