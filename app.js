const express = require('express');
const morgan = require('morgan')
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

module.exports = app;
