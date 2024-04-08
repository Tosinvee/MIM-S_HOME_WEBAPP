const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'A product must have a title'],
        trim: true
    },
    slug:{
        type: String,
        required: true,
        unique: true,
        lowercase:true
    },
    description:{
        type: String,
        required:true,
        unique: true
    },

    quantity:{
        type:Number,
        required: [true, 'A product must a have price']
    },
    price:{
        type:Number,
        required:true
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product