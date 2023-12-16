const express = require('express');
const cartRouter = express.Router();

cartRouter.post('/', async (req, res) => {
    data = req;
    console.log(data)
    res.send('cart add')
})

module.exports = cartRouter;