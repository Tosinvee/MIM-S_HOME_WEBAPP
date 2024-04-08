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
        requited: true
    },
    sold:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    images:{
        type: Array
    },
    color:{
        types: String,
        enum: ["Black", "Brown", "Red"]
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product