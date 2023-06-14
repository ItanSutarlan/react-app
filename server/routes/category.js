const express = require('express');
const CategoryController = require('../controllers/category');
const authorization = require('../middlewares/authorization');
const router = express.Router();

router.use(authorization);
router.get('/', CategoryController.getCategories);
router.get('/:id', CategoryController.getCategoryById);
router.post('/', CategoryController.postCategories);
router.put('/:id', CategoryController.putCategoryById);
router.delete('/:id', CategoryController.deleteCategoryById);

module.exports = router;
