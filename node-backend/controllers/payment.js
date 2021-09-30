const express = require("express");
// const bodyparser = require('body-parser')
const path = require("path");
const { checkout } = require("../routes/user");
const app = express();
const YOUR_DOMAIN = "http://localhost:4200";
var Secret_Key =
    "sk_test_51JI4zdSJvdpyLvMGkFDxxzIJhpyv0MAKTKIenw9uMvuRABeK1FYMFFDex2nRzixQ1HklxXuSPgyJZZHj1Qh3DBoW00HcNkoTT8";
const stripe = require("stripe")(Secret_Key);

exports.payment = async (req, res) => {
    const product = req.body;
    // console.log(req.body);
    // console.log(product[0].productBrandName);
    // const images = path.join(__dirname, '../public/upload/${'req.body[0].productImage[0]'}");
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],

        line_items: [
            {
                price_data: {
                    currency: "inr",

                    product_data: {
                        name: product[0].productBrandName,
                    },
                    unit_amount: product[0].productTotalAmt * 100,
                },

                quantity: product[0].productQuantity,
            },
        ],
        mode: "payment",
        success_url: `${YOUR_DOMAIN}/other`,
        cancel_url: `${YOUR_DOMAIN}/home`,
    });
    res.send({ successcode: 1, id: session.id, data: "successfull" });
    // webhook.status();
    // res.render(`checkout.html`)
    // res.json({
    //     id: session.id,
    // });
};

exports.Success = async (req, res) => {
    console.log(res);
    // const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    // console.log(session);
    // const customer = await stripe.customers.retrieve(session.customer);

    res.send(`
    <html>
      <body>
        <h1>Thanks for your order,! </h1>
      </body>
    </html>
  `);
}
//  = async (req, res) => {
//     const { product } = req.body;
//     const session = await stripe.checkout.sessions.create({
//         payment_method_types: ["card"],
//         line_items: [
//             {
//                 price_data: {
//                     currency: "inr",
//                     product_data: {
//                         name: product.name,
//                         images: [product.image],
//                     },
//                     unit_amount: product.amount * 100,
//                 },
//                 quantity: product.quantity,
//             },
//         ],
//         mode: "payment",
//         success_url: `${YOUR_DOMAIN}/success.html`,
//         cancel_url: `${YOUR_DOMAIN}/cancel.html`,
//     });

//     res.json({ id: session.id });
// }
const endpointSecret = 'whsec_PDPVjfDoAtbb1ZjuinSFtF6UKcEsqQs6';
exports.webhook = function (request, response) {
    const sig = request.headers['stripe-signature'];
    const body = request.body;
    console.log(body);
    let event = null;

    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
        // invalid signature
        response.status(400).end();
        return;
    }

    let intent = null;
    switch (event['type']) {
        case 'payment_intent.succeeded':
            intent = event.data.object;
            console.log("Succeeded:", intent.id);
            break;
        case 'payment_intent.payment_failed':
            intent = event.data.object;
            const message = intent.last_payment_error && intent.last_payment_error.message;
            console.log('Failed:', intent.id, message);
            break;
    }

    response.sendStatus(200);
}
const clientSecret = ' whsec_PDPVjfDoAtbb1ZjuinSFtF6UKcEsqQs6';
exports.payementintent = function (req, res, next) {
    stripe.retrievePaymentIntent(clientSecret).then(function (response) {
        if (response.paymentIntent && response.paymentIntent.status === 'succeeded') {
            // Handle successful payment here
            console.log(response);
        } else {
            console.log(response);
            // Handle unsuccessful, processing, or canceled payments and API errors here
        }
    });
}
