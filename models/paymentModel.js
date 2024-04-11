const { required } = require('joi')
const moongose = require('mongoose')

const paymentSchema = new moongose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    refernce:{
        type:String,
        required:true,
        unique:true
    },
    status:{
        type:String,
        required:true
    }
},
{
    timestamps: true
}
)
const Payment = moongose.model(Payment,paymentSchema)

module.exports = Payment