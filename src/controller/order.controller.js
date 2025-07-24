import SSLCommerzPayment from 'sslcommerz-lts';
import { ApiSuccess } from '../utils/ApiSuccess.js';
import { TryCatch } from "../utils/TryCatch.js";
const store_id = 'xyz6835d09f070c3'
const store_passwd = 'xyz6835d09f070c3@ssl'
const is_live = false //true for live, false for sandbox
const createOrder = TryCatch(async (req, res) => {
     const data = {
        total_amount: 100,
        currency: 'BDT',
        tran_id: 'REF123', // use unique tran_id for each api call
        success_url: 'http://localhost:8000/api/v1/orders/success',
        fail_url: 'http://localhost:8000/api/v1/orders/fail',
        cancel_url: 'http://localhost:8000/api/v1/orders/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then(apiResponse => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL
        res.redirect(GatewayPageURL)
        console.log('Redirecting to: ', GatewayPageURL)
    });
})

const orderSuccess = TryCatch(async (req, res) => {
    return res.json(new ApiSuccess(200, "order success", {}))
})
const orderFail = TryCatch(async (req, res) => {
    return res.json(new ApiSuccess(200, "order fail", {}))
})
const orderCancel = TryCatch(async (req, res) => {
    return res.json(new ApiSuccess(200, "order cancel", {}))
})
export { createOrder, orderCancel, orderFail, orderSuccess };

