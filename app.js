const express = require('express');
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes');
const categoryRouter = require('./routes/categoryRouter')


const app = express()

//GLOBAL MIDDLEWARES
// set security HTTP headers
app.use(helmet())

//Development logging
if (process.env.NODE_ENV = 'development')
app.use(morgan('dev'));

//limit request from same api
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'

});
app.use('/api', limiter)

//body parser middleware that parses the JSON data and makes it available in req.body 
app.use(express.json())

//Data sanitization against Nosql query injection
app.use(mongoSanitize());

//Data sanitization against XSS
app.use(xss())

//serving static files
app.use(express.static(`${__dirname}/public`))



//ROUTES- mounting of route
app.use('/api/users', userRouter )
app.use('/api/products', productRouter)
app.use('api/categories',categoryRouter)

//undefined route handler
app.all('*', (req,res,next)=>{
// const err =new Error(`cant find ${req.originalUrl} on this server `)
// err.status = 'fail';
// err.statusCode = 404;

    next(new AppError(`cant find ${req.originalUrl} on this server `, 404))
})

app.use(globalErrorHandler)



module.exports = app;
