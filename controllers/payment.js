const paymentService = require('../Service/payment.service');
const catchAsync = require('../utils/catchAsync');

const paymentInstance = new paymentService();

const startPayment = catchAsync(async(req, res)=>{
    const response = await paymentInstance.startPayment(req.body)
    res.status(200).json({
        status:"success",
        data: response
    })
})

const createPayment = catchAsync(async(req, res)=>{
    const response = await paymentInstance.createPayment(req.body)
    res.status(200).json({
        status:"success",
        data: response
    })
})

const getPayment = catchAsync(async(req, res)=>{
    const response = await paymentInstance.getPayment(req.body)
    res.status(200).json({
        status:"success",
        data: response
    })
})

module.exports = {startPayment, createPayment, getPayment}