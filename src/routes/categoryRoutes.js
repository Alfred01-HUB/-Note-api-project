const express = require('express');
const router = express.Router();
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const { protect } = require('../middleware/authMiddleware');
const { validate, categoryValidationRules } = require('../utils/validators');

router.use(protect);

router.route('/').get(getCategories).post(categoryValidationRules, validate, createCategory);
router.route('/:id').get(getCategoryById).put(categoryValidationRules, validate, updateCategory).delete(deleteCategory);

module.exports = router;
