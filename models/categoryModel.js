const { default: mongoose } = require('mongoose');
const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },

    image:{
        type: String,
        required:true
    }

},
{
    timestamps: true
}
);

const Categories = mongoose.model('Catergories', categorySchema)

module.exports = Categories