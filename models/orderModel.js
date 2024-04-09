const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    orderItems :[
        {
            name:{type:String, required:true},
            size:{type:String, required:true},
            color:{type:String, required:true},
            qty:{type:String, required:true},
            image:{type:String, required:true},
            price:{type:String, required:true},
            product:{
                type:moongose.Schema.Types.ObjectId,
                ref:'Products',
                required:true,
            }
        }
    ],
    shippingAddress:{
        fullname:{type:String},
        address:{type:String},
        email:{
            type:String,
            trim:true,
            lowercase:true
        },
        location:{type:String},
        phoneNumber:{type:String},
        shippingMethod:{type:String},
        shippingCost:{type:Number},   
    },
    payments:{
        paymentMethod:{type:String},
        status: {type:String, default:'pending', required:true},
        paymentDate:{type:Date}
    },
    delivery:{
        status:{type:String, default:'awaiting',required: true},
        deliveryDate:{type:Date},
        deliveryMethod:{type:String},
    },
    totalPrice:{type:Number, required:true},
    subTotalPrice:{type:Number, required:true},
    taxprice:{type:Number, required:true, default:0.0},
})

const Orders = mongoose.model(Orders, orderSchema)

module.exports = Orders