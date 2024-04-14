const { default: mongoose } = require("mongoose");
const Categories = require("../models/categoryModel");
const Products = require("../models/productModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const slugify = require("slugify");

const getAllProducts = catchAsync(async (req, res, next) => {
  let filter = {};
  if(req.query.Categories){
    filter = {category:req.query.Categories.split(',}')}
  }
  const product = await Products.find(filter).select("category");

  res.status(200).json({
    status: "sucess",
    data: {
      product,
    },
  });
});

//ANOTHER WAY TO GET A PRODUCT BY ID
// const getProduct = catchAsync(async (req, res, next) => {
//   const {id} = req.params
//   const productId = parseInt(id, 10)
//   const product = await Product.findById(id);

//   if (!product) {
//     return next(new AppError("invalid id", 404));
//   }
//     res.status(200).json({
//       status: "sucess",
//       data:{
//         product
//       }
//     });

// });

const getProduct = catchAsync(async (req, res, next) => {
  const product = await Products.findById(req.params.id);

  if (!product) {
    return next(new AppError("No product found with this ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

const createProduct = catchAsync(async (req, res, next) => {
  const category = await Categories.findById(req.body.category);
  if (!category) {
    return next(new AppError("invalid category", 404));
  }

  const newProduct = new Products({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    quantity: req.body.quantity,
    category: req.body.category,
    countInStock: req.body.countInStock,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });
  const product = await newProduct.save();

  if (!product) {
    return next(AppError("This product cannot be created", 404));
  }
  res.status(200).json({
    status: "sucess",
    data: {
      newProduct,
    },
  });
});

//UPDATE PRODUCT
const updateProduct = catchAsync(async (req, res, next) => {
// this method returns true if id is valid
  if(!mongoose.isValidObjectId(req.params.id)){
  return next(new AppError('Invalid id', 404))
  }
  const category = await Categories.findById(req.body.category);
  if (!category) {
    return next(new AppError("invalid category", 404));
  }
  const product = await Products.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      quantity: req.body.quantity,
      category: req.body.category,
      countInStock: req.body.countInStock,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    { new: true }
  );

  if (!product) {
    return next(new AppError("product cannot be updated", 404));
  }

  res.status(200).json({
    status: "sucess",
    data: {
      product,
    },
  });
});

//DELETE PRODUCT
const deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Products.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError("No user with this id", 404));
  }
  res.status(200).json({
    status: "sucess",
    data: null,
  });
});


module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
