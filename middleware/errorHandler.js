//error comes from class ErrorResponse the class takes two arguments:
const ErrorResponse = require("../utils/errorResponse");

// ErrorResponse(message, statusCode)
const errorHandler = (error, req, res, next) => {
    //copy of the error
    let errorCopy = {...error};
    errorCopy.message = error.message;

    //log to console for dev
    console.log(error);

    // Handling diff types of error
    // Mongoose bas ObjectId
    if(error.name === 'CastError') {
        const message = `Could not find Resource with id: ${error.value}`;
        errorCopy = new ErrorResponse(message, 404);
    }
    //Mongoose duplicate key
    if (error.code == 11000){
        const message = `Duplicate field value entered`;
        errorCopy = new ErrorResponse(message, 400);
    } 
    //Mongoose values validation error
    if (error.name == 'ValidationError'){
        //extract messages from mongoose schema required values
        const message = Object.values(error.errors).map(val => val.message);
        errorCopy = new ErrorResponse(message, 400);
    } 


    res.status(errorCopy.statusCode || 500).json({
        succes: false,
        error: errorCopy.message || 'Server Error'
    });
};

module.exports = errorHandler;