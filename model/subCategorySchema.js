const { default: mongoose, mongo } = require("mongoose");

const subCategorySchema = new mongoose.Schema({
    parentId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        // required: true
    },
    slug: {
        type: String,
        // required: true
    }
});

const SubCategory = mongoose.model('subcategory', subCategorySchema);

module.exports = SubCategory;