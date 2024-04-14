
const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique: true
    },

    icon:{
        type: String,

},
    color:{
        type:String
    }
},
{
    timestamps: true
}
);

const Categories = mongoose.model('Catergories', categorySchema)

module.exports = Categories