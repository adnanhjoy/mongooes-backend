const Product = require('../model/productSchema');

const productsController = async (req, res) => {
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
}


const singleProductController = async (req, res) => {
    try {
        const id = req.params.id;
        const getSingleData = await Product.findOne({ _id: id });
        if (getSingleData) {
            res.status(200).send({
                succes: true,
                data: getSingleData
            })
        } else {
            res.status(404).send({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}


const createProductController = async (req, res) => {
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
}


const updateProductController = async (req, res) => {
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
}


const deleteProductController = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteProduct = await Product.findByIdAndDelete(id);

        if (deleteProduct) {
            res.status(200).send("Succesully deleted");
        } else {
            res.status(404).send({ message: "Product not deleted" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

module.exports = {
    productsController,
    singleProductController,
    createProductController,
    updateProductController,
    deleteProductController
}