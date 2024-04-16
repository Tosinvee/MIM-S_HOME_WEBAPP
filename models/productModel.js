const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A product must have a title"],
      trim: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },

    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required:true
    },
    image: {
      type: String,
      default: "",
    },
    images: [
      {
        types: String,
      },
    ],
    brand:{
        type: String,
        default:'',
    },

    color: {
      types: String,
      enum: ["Black", "Brown", "Red"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    countInStock:{
        type: Number,
        required:true,
        min:0,
        max: 500,
    },
    rating:{
        type:Number,
        default:0
    },
    numReviews:{
        type:Number,
        default:0
    },
    isFeatured:{
        type:Boolean,
        default:false
    }
  },
  {
    timestamps: true,
  }
);

productSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

productSchema.set('toJSON', {
  virtuals: true,
});


const Products = mongoose.model("Products", productSchema);

module.exports = Products;
