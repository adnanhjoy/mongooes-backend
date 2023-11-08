const { default: mongoose } = require("mongoose");

const cartSchema = new mongoose.Schema({
    qty: {
        type: Number,
        required: true
    }
})

module.exports =  cartSchema;