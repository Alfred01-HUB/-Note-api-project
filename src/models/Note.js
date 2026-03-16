const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Note must have a title'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Note must have content'],
    },
    isRichText: {
      type: Boolean,
      default: false,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
  },
  { timestamps: true }
);

noteSchema.index({ user: 1, title: 'text', content: 'text' });

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
