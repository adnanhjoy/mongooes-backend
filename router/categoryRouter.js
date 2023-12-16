const express = require('express');
const { categoryController, getCategoryController } = require('../controller/categoryController');
const categoryRouter = express.Router();


// category post

categoryRouter.post('/', categoryController);


// category get

categoryRouter.get('/', getCategoryController)

module.exports = categoryRouter;