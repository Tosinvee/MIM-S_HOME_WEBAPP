
// //const payStack = (request) => {

//   const initializePayment = (form, myCallBack) => {
//     const options = {
//       url: "https://api.paystack.co/transaction/initialize",//THE ENDPOINT WE ARE ACCESSING WHICH IS THE PATSTACK INITIALIZE ENDPOINT
//       headers: {
//         authorization: process.env.PAYSTACK_SECRET_KEY,
//         "content-type": "application/json",
//         "cache-control": "no-cache",
//       },
//       form,  
//     };
//     //
//     const callBack = (error, response, body) => {
//       return myCallBack(error, body);
//     };
    
//     request.post(options, callBack); 
//   };

  
//   const verifyPayment = (ref, myCallBack) => {

//     const options = {
//       url:
//         "https://api.paystack.co/transaction/verify/" + encodeURIComponent(ref), //THE REFERENCE OF THE TRANSACTION WE WANT TO VERIFY
//       headers: {
//         authorization: process.env.PAYSTACK_SECRET_KEY,
//         "content-type": "application/json",
//         "cache-control": "no-cache",
//       },
//     };
//     const callBack = (error, response, body) => {
//       return myCallBack(error, body);
//     };
//     request(options, callBack);
//   };
//   //THIS RETURN AN OBJECT CONTAINING THE TWO FUNCTIONS TO BE ACCESESD OUTSIDE THE PAYSTACK FUNC
//   return { initializePayment, verifyPayment };


// // module.exports = {initializePayment, verifyPayment};
