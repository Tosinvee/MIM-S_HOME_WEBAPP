const Orders = require('../models/orderModel');
const Products = require('../models/productModel');
const catchAsync = require('../utils/catchAsync')

const createOrder = catchAsync(async(req, res, next)=>{
    const {orderItems ,subTotalPrice,totalPrice} = req.body;
    const order = new Orders({
        orderItems,subTotalPrice,totalPrice,
        user:req.user._id
    })
    // reduce stock of ordered products
    orderItems.forEach(async(item)=>{
        const product = await Products.findById(item.product)
        product.stock = product.stock - item.qty
        await product.save()
    })
    const createdOrder = await Orders.save()

    res.status(201).json(createdOrder)
})