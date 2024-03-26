const getAllProducts = (req,res)=>{
    res.status(500).json({
        status: 'error',
        message:'on the way'
    })
}
const getProduct = (req,res)=>{
    console.log(req.params)
    const id = req.param.id* 1

    const product = products.find(el => el.id === id);

    //if (id > tours.lenght){

    if(!product){
        res.status(500).json({
            status: 'error',
            message:'on the way'
        })  
    }
    
}
const createProduct = (req,res)=>{
    res.status(500).json({
        status: 'error',
        message:'on the way'
    })
}
const updateProduct = (req,res)=>{
    res.status(500).json({
        status: 'error',
        message:'on the way'
    })
}
const deleteProduct = (req,res)=>{
    res.status(500).json({
        status: 'error',
        message:'on the way'
    })
}

module.exports = {getAllProducts,getProduct,createProduct,updateProduct,deleteProduct}