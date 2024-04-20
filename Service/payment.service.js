//const request = require('request')
const Payment = require('../models/paymentModel');
const _ = require('lodash');
const { initializePayment, verifyPayment } = require('../utils/payment');

class PaymentService {
    async startPayment(data) {
        try {
            const form = _.pick(data, ['amount', 'email', 'full_name']);
            form.metadata = {
                full_name: form.full_name
            };
            form.amount *= 100;

            const response = await initializePayment(form);
            return response;
        } catch (error) {
            error.source = 'start payment service';
            throw error;
        }
    }

    async createPayment(req) {
        try {
            const ref = req.reference;
            console.log(ref)
            if (!ref) {
                throw { code: 400, message: 'No reference passed in query!' };
            }

            const response = await verifyPayment(ref);
            const { reference, amount, status } = response.data;
            const { email } = response.data.customer;
            const full_name = response.data.metadata.full_name;

            const newPayment = { reference, amount, email, full_name, status };
            const payment = await Payment.create(newPayment);
            
            return payment;
        } catch (error) {
            error.source = 'create payment service';
            throw error;
        }
    }

    async getPayment(body) {
        try {
            const reference = body.reference;
            const transaction = await Payment.findOne({ reference });
            return transaction;
        } catch (error) {
            error.source = 'Payment Receipt';
            throw error;
        }
    }
}

module.exports = PaymentService;