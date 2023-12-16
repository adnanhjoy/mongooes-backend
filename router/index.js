const express = require('express');
const productRouter = require('./productRouter');
const categoryRouter = require('./categoryRouter');
const cartRouter = require('./cartRouter');
const userRouter = require('./userRouter');
const router = express.Router();

//router

router.use('/product', productRouter);
router.use('/category', categoryRouter);
router.use('/cart', cartRouter);
router.use('/user', userRouter);

module.exports = router;