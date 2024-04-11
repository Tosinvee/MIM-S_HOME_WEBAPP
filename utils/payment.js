//THIS payStack function is designed to handle payment processing using the Paystack API. It consists of two main functions: initializePayment and verifyPayment.
const payStack = (request) => {
  // THIS FUNCTION TAKES TWO PARAMETER FORM AND CALLBACK
  const initializePayment = (form, myCallBack) => {
    // THE OPTIONS OBJECT CONTAINS THE URL,HEADER, AND FORM DATA
    const options = {
      url: "https://api.paystack.co/transaction/initialize",//THE ENDPOINT WE ARE ACCESSING WHICH IS THE PATSTACT INITIALIZE ENDPOINT
      headers: {
        authorization: process.env.PAYSTACK_SECRET_KEY,
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
      form, // THE FORM CONSIST OF ALL THE INFORMATION THAT WE COLLECT FROM THE USER LIKE NAME, AMOUNT, ETC 
    };
    //CALLBACK TAKES 3 PARAMETER AND CALLS MYCALLBACK FUNC WITH ERROR AND ARGUMENT AS ARG
    const callBack = (error, response, body) => {
      return myCallBack(error, body);
    };
    // THIS MAKES MAKE AN HTTP POST REQUEST USING THE REQUEST MODULE PASSING
    request.post(options, callBack); // OPTIONS AND CALLBACK AS ARG
  };

  // THIS FUNCTION TAKES TWO PARAMETER REF AND MYCALLBACK
  const verifyPayment = (ref, myCallBack) => {
    // THIS LINE MAKES AN HTTP REQ TO VERIFY A PAYMENT THR THE PAYSTACK API
    const options = {
      url:
        "https://api.paystack.co/transaction/verify/" + encodeURIComponent(ref), //THE REFERENCE OF THE TRANSACTION WE WANT TO VERIFY
      headers: {
        authorization: process.env.PAYSTACK_SECRET_KEY,
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
    };
    const callBack = (error, response, body) => {
      return myCallBack(error, body);
    };
    request(options, callBack);
  };
  //THIS RETURN AN OBJECT CONTAINING THE TWO FUNCTIONS TO BE ACCESESD OUTSIDE THE PAYSTACK FUNC
  return { initializePayment, verifyPayment };
};
// THIS EXPORT THE FUNCTION MAKINH IT AVAILABLE IN OTHER MODULES
module.exports = payStack;
