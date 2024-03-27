const express = require('express');
const morgan = require('morgan')
const AppError = require('./utils/appError')
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')

const app = express()

//MIDDLEWARES
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
// middleware that parses the JSON data and makes it available in req.body 
app.use(express.json())
app.use(express.static(`${__dirname}/public`))



//ROUTES- mounting of route
app.use('/users', userRouter )
app.use('/products', productRouter)

//undefined route handler
app.all('*', (req,res,next)=>{
next(new AppError(`cant find ${req.originalUrl}on this server`, 404))
});
//global error handling
app.use((err,req,res,next)=>{
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message
    })
})

module.exports = app;
