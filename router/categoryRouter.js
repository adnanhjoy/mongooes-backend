const express = require('express');
const Category = require('../model/categortSchema');
const SubCategory = require('../model/subCategorySchema');
const categoryRouter = express.Router();


// category post

categoryRouter.post('/category', async (req, res) => {
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

categoryRouter.get('/category', async (req, res) => {
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

module.exports = categoryRouter;