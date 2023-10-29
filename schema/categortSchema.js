const { default: mongoose } = require("mongoose");

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    subCategory: [{
        title: {
            type: String,
        },
        slug: {
            type: String
        },
        children: [{
            title: {
                type: String,
            },
            slug: {
                type: String
            }
        }]
    }]
})

const Category = mongoose.model('category', categorySchema);

module.exports = Category;