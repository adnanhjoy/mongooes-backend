const experss = require('express');
const Product = require('../schema/productSchema');
const productRouter = experss.Router();

//get product

productRouter.get('/product', async (req, res) => {
    try {
        const price = req.query.price;
        const rating = req.query.rating;
        let products;
        let totalProduct;
        if (price || rating) {

            products = await Product.find({
                $and: [
                    { price: { $gt: price } },
                    { rating: { $gte: rating } }
                ]
            }).sort({ date: -1 });

            totalProduct = await Product.find({
                $and: [
                    { price: { $gt: price } },
                    { rating: { $gte: rating } }
                ]
            }).countDocuments();

        } else {
            products = await Product.find().sort({ date: -1 });
            totalProduct = await Product.find().countDocuments();
        }

        if (products) {
            res.status(201).send({
                succes: true,
                totalProduct: totalProduct,
                data: products
            })
        } else {
            res.status(404).send({ message: "Product Not Found" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})


//post product

productRouter.post('/product', async (req, res) => {
    try {
        const setProduct = new Product({
            ...req.body
        })
        const productData = await setProduct.save();
        if (productData) {
            res.status(200).send({
                success: true,
                data: productData
            })
        } else {
            res.status(404).send({ message: 'Product Not Post' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})


//update product

productRouter.put('/product/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updateProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });

        if (updateProduct) {
            res.status(200).send({
                success: true,
                data: updateProduct
            })
        } else {
            res.status(404).send({ message: "Product not update" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

module.exports = productRouter;