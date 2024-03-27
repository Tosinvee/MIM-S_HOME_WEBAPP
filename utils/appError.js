//Declares a new class named AppError that extends the built-in JavaScript Error class.
//This means that AppError inherits all the properties and methods of the Error class.
class AppError extends Error {
    //The constructor is a special method that is called automatically when a new instance of the class is created
    constructor(message, statusCode){
        //This line calls the constructor of the superclass (i.e., the Error class) with the message parameter.
        super(message)
        //This line sets the statusCode property of the AppError instance to the value of the statusCode parameter passed to the constructor.
        this .statusCode =statusCode;
        //This line sets the status property of the AppError instance based on the value of the statusCode property. 
        //If the status code starts with '4' (indicating a client error), the status property is set to 'fail'. Otherwise, it is set to 'error'.
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        //This property indicates whether the error is operational, meaning it is an error that occurs during normal operation of the application
        this.isOperational = true
        //this associates the stack trace with the AppError instance, 
        //so the stack trace includes information about the location in the code where the AppError instance was created.
        Error.captureStackTrace(this, this.constructor)

    }
}
module.exports = AppError