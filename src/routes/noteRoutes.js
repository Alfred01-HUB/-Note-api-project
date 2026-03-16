const express = require('express');
const router = express.Router();
const {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');
const { validate, noteValidationRules } = require('../utils/validators');

router.use(protect);

router.route('/').get(getNotes).post(noteValidationRules, validate, createNote);
router.route('/:id').get(getNoteById).put(noteValidationRules, validate, updateNote).delete(deleteNote);

module.exports = router;
