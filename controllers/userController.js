const User = require('../models/usersModel')

const getAllUsers = async (req,res)=>{
    try{
        const users = await User.find()
        res.status(200).json({
            status: 'sucess',
            data:{
                users
            }
        }) 
    }catch(err){
        console.log(err)
        res.status(404).json({
            status:'fail',
            message:err
        })
    }
    
}
const getUser = (req,res)=>{
    res.status(500).json({
        status: 'error',
        message:'on the way'
    })
}
const createUser =async(req,res)=>{
    try{
        const newUser = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            passwordConfirm:req.body.passwordconfirm,
            role:req.body.role
    
        })
        res.status(200).json({
            status: 'sucess',
            data:{
              user:newUser  
            }

        })
    }catch(err){
        res.status(404).json({
            status:'fail',
            message:err
        })
    }
}
const updateUser= (req,res)=>{
    res.status(500).json({
        status: 'error',
        message:'on the way'
    })
}
const deleteUser = (req,res)=>{
    res.status(500).json({
        status: 'error',
        message:'on the way'
    })
}

module.exports = {getAllUsers,getUser,createUser,updateUser,deleteUser}