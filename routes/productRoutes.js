const express = require('express');
const {getAllProducts,getProduct,createProduct,updateProduct,deleteProduct} = require('../controllers/productContoller')
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
.get(getProduct)
.patch(updateProduct)
.delete(deleteProduct)

module.exports = router;