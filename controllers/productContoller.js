const Product = require("../models/productModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const slugify = require('slugify')

const getAllProducts = catchAsync(async(req, res,next) => {
    const product = await Product.find()

  res.status(200).json({
    status: "sucess",
    data:{
        product
    }
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
  const product = await Product.findById(req.params.id);

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
  const newProduct = await Product.create(req.body);

  res.status(200).json({
    status: "sucess",
    data: {
      product: newProduct,
    },
  });
});
//UPDATE PRODUCT
const updateProduct =catchAsync(async(req, res,next) => {
    const productId= req.params.id
//checks if the rreq.body contains a property called titlt
    if(req.body.title){
        req.body.slug = slugify(req.body.title)//if the cond is met a slug is generated from the title
    }
    const product = await Product.findOneAndUpdate({_id: productId}, req.body, {
        new:true
    })

    if(!product){
        return next(new AppError("product not found", 404))
    }

  res.status(200).json({
    status: "sucess",
    data:{
        product
    }
  });
});
const deleteProduct =catchAsync(async(req, res,next) => {
    const product = await Product.findByIdAndDelete(req.params.id)

    if(!product){
        return next(new AppError('No user with this id', 404))
    }
  res.status(200).json({
    status: "sucess"
  });
});

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
