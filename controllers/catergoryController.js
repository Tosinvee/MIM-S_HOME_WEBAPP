const Categories = require("../models/categoryModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const getCategories = catchAsync(async (req, res, next) => {
  const categories = await Categories.find();
  if(!categories){
    return next(AppError('category not found'))
  }
  res.status(200).json({
    status: "success",
    data: {
      categories,
    },
  });
});

const getCategory = catchAsync(async(req, res, next)=>{
  const category = await Categories.findById(req.param.id)
  if(!category){
    return next(AppError('No category with this id'))
  }
  res.status(200).json({
    status:'sucess',
    data:{
      category
    }
  })
})

const createCategory = catchAsync(async (req, res, next) => {
  const { name, icon, color } = req.body;
  //check if category exists
  const existCategory = await Categories.find({ name });
  if (existCategory.length > 0) {
    return next(new AppError("category already exist", 404));
  }
  const category = new Categories({ name, icon, color });
  const createCategory = await category.save();
  res.status(200).json({
    status: "sucess",
    data: {
      createCategory,
    },
  });
});

const updateCategory = catchAsync(async (req, res, next) => {
  const { name, icon, color } = req.body;
  const category = await Categories.findById(req.param.id);

  if (category) {
    category.name = name || category.name;
    category.icon = icon || category.icon;
    category.color = color || category.color

    const updateCategory = await category.save();
    res.status(200).json({
      status: "sucess",
      data: {
        updateCategory,
      },
    });
  }
  return next(new AppError("category not found"));
});

const deleteCategory = catchAsync(async(req, res, next)=>{
    const category = await Categories.findByIdAndDelete(req.params.id);

  if (!category) {
    return next(new AppError('category not found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
    message:'category deleted sucessfully'
  });
});

module.exports = {getCategories,createCategory,updateCategory,deleteCategory}

