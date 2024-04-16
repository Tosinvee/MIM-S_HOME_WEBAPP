const orderItems = require('../models/orderItemModel');
const Order = require('../models/orderModel');
const Products = require('../models/productModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync')

const getOrder = catchAsync(async(req,res,next)=>{
 const order = await Order.find()

 res.status(200).json({
    status:'sucess',
    data:{
        order
    }
 })
})

const createOrder = catchAsync(async(req,res,next)=>{
    const orderItemsIds = req.body.orderItems.map(async orderItem=>{
        let newOrderItem = new orderItems({
            quantity:orderItem.quantity,
            product:orderItem.product
        })

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id

    }) 

    let order = new Order({
        orderItems:orderItemsId,
        shippingAddress1:req.body.shippingAddress1,
        shippingAddress2:req.body.shippingAddress2,
        city:req.body.city,
        zip:req.body.zip,
        country:req.body.country,
        phone:req.body.phone,
        status:req.body.status,
        totalPrice:req.body.totalPrice,
        user:req.body.user

        
    })
    order = await order.save();

    if(!order){
        return next(new AppError(''))
    }
    res.status(200).json({
        status:'sucess',
        data:{
            order
        }
     })
})