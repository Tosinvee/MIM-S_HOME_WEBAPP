const { response } = require("express")

const payStack = (request) =>{

    const initializePayment = (form, myCallBack) =>{
        const options = {
            url :"https://api.paystack.co/transaction/initialize",
            headers:{
                authorization: process.env.PAYSTACK_SECRET_KEY,
                'content-type': 'application/json',
                'cache-control': 'no-cache'
            },
            form
        }
        const callBack = (error, response,body) =>{
            return myCallBack(error, body)
        }
        request.post(options, callBack)
    }


const verifyPayment = (ref, myCallBack) =>{
const options = {
    url: "https://api.paystack.co/transaction/verify/"+encodeURIComponent(ref),
    headers:{
        authorization: process.env.PAYSTACK_SECRET_KEY,
        'content-type': 'application/json',
        'cache-control': 'no-cache'
    }
}
const callBack = (error, response,body) =>{
    return myCallBack(error, body)
}
request(options, callBack)

}
return {initializePayment, verifyPayment }
}

module.exports = payStack