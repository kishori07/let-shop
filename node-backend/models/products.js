const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const products = new Schema({
    productId: {
        type: String,
        required: true
    },
    productBrandName: {
        type: String,
        required: true
    },
    productModel: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productImage: {
        type: [],
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    productAvailability: {
        type: Number,
        requied: true
    },
    StarRating: {
        type: Number,
        required: true
    },
    category: {
        type: Number,
        required: true
    },
    specId: {
        type: String,
    }

})
module.exports = mongoose.model('Products', products);
