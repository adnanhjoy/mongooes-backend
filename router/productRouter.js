const experss = require('express');
const { productsController, singleProductController, createProductController, updateProductController, deleteProductController } = require('../controller/productController');
const productRouter = experss.Router();

//get product

productRouter.get('/', productsController)

//get single product

productRouter.get('/:id', singleProductController)


//post product

productRouter.post('/', createProductController)


//update product

productRouter.put('/:id', updateProductController)


//delete product
productRouter.delete('/:id', deleteProductController)

module.exports = productRouter;