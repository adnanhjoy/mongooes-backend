const { default: mongoose } = require("mongoose");

// product schmea 
const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    images: [],
    price: {
        type: Number,
        required: true
    },
    regularPrice: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    brand: {
        type: String,
    },
    details: {
        type: String,
        required: true
    },
    point: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// product model 

const Product = mongoose.model('product', productsSchema);
module.exports = Product;
