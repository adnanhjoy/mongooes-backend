const express = require('express');
const { default: mongoose } = require('mongoose');
const Product = require('./schema/productSchema');
const Category = require('./schema/categortSchema');
const SubCategory = require('./schema/subCategorySchema');
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(express.json());

// db connect
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/lesson1');
        console.log('DB is Connected');
    } catch (error) {
        console.log('DB is not Connected');
        console.log(error.message)
    }
}

//post product

app.post('/product', async (req, res) => {
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

//get product

app.get('/product', async (req, res) => {
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
            });

            totalProduct = await Product.find({
                $and: [
                    { price: { $gt: price } },
                    { rating: { $gte: rating } }
                ]
            }).countDocuments();

        } else {
            products = await Product.find();
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

// category post

app.post('/category', async (req, res) => {
    try {
        const mainCategory = new Category({
            ...req.body
        });

        const savedMainCategory = await mainCategory.save();

        if (savedMainCategory) {
            const subCategory = new SubCategory({
                parentId: savedMainCategory._id,
                ...req.body
            });

            const savedSubCategory = await subCategory.save();

            if (savedSubCategory) {
                res.status(200).json({
                    success: true,
                    data: { mainCategory: savedMainCategory, subCategory: savedSubCategory },
                });
            } else {
                res.status(404).json({ message: 'Subcategory not saved' });
            }
        } else {
            res.status(404).json({ message: 'Main category not saved' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// category get

app.get('/category', async (req, res) => {
    try {
        const categories = await Category.find();
        if (categories) {
            res.status(200).send({
                succes: true,
                data: categories
            })
        } else {
            res.status(404).send({ message: "Category not found" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})


//call database
connectDB();

//root route
app.get('/', (req, res) => {
    res.send('Server is Connected');
});

app.listen(port, () => {
    console.log(`Server Runnig Port ${port}`);
})