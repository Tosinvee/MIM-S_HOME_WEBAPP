//const request = require('request')
const Payment = require('../models/paymentModel')
const _ = require('lodash')
const payStack = require('../utils/payment');
const initializePayment = payStack.initializePayment;
const verifyPayment = payStack.verifyPayment;

class paymentService{
    startPayment(data){
        return new Promise(async(resolve, reject)=>{
            try{
                const form = _.pick(data, ['amount', 'email', 'full_name']);
                form.metadata = {
                    full_name : form.full_name
                }
                form.amount *= 100;

                initializePayment(form, (error, body)=>{
                    if (error){
                        reject (error.message)
                    }
                    const response = JSON.parse(body);

                    return resolve(response)
                });
            }catch(error){
                error.source = 'start payment service';
                return reject(error)
            }
        })
    }

    createPayment(req){
        const ref = req.reference;
        if(req==null){
            return reject({code: 400, message:'no reference passed in query!'})
        }
        return new Promise(async(resolve, reject)=>{
            try{
                verifyPayment(ref, (error, body)=>{
                    if(error){
                        reject(error.message)
                    }
                    const response = JSON.parse(body);

                    const{reference, amount, status} = response.data;
                    const {email} = response.data.customer;
                    const full_name = response.data.metadata.full_name;
                    const newPayment = {reference, amount, email, fullname, status}
                    const payment = Payment.create(newPayment)

                    return resolve(payment)
                })
            }catch(error){
                error.source = 'create payment service';
                return reject(error)
            }
        });
    }

   paymentReceipt(body){
    return new Promise(async(resolve, reject)=>{
        try{
          const reference = body.refernce;
          const transaction = Payment.findOne({reference:reference})
          return resolve(transaction);  
        }catch(error){
            error.source = 'Payment Receipt';
            return reject(error)
        }
    })
   } 
}

module.exports = paymentService