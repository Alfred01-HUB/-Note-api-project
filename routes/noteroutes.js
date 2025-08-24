const express = require('express');
const { getNote, createNote } = require('../controllers/notecontrollers');

const router = express.Router();
router.route('/').get(getNote).post(createNote);

module.exports= router;