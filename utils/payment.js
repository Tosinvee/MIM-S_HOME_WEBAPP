const axios = require('axios');
const dotenv = require("dotenv");

const initializePayment = async (form) => {
  try {
    const response = await axios.post("https://api.paystack.co/transaction/initialize", form, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    });
    return response.data;
  } catch (error) { 
    throw error;
  }
};

const verifyPayment = async (ref) => {
  try {
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${encodeURIComponent(ref)}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports = { initializePayment, verifyPayment };