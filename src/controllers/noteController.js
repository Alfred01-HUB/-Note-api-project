const Note = require('../models/Note');

exports.getNotes = async (req, res) => {
  try {
    const { tag, category, search } = req.query;
    const query = { user: req.user._id };

    if (tag) {
      query.tags = tag;
    }
    if (category) {
      query.category = category;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    const notes = await Note.find(query)
      .populate('category', 'name')
      .sort({ createdAt: -1 });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id }).populate('category', 'name');

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createNote = async (req, res) => {
  try {
    const { title, content, isRichText, tags, category } = req.body;

    const note = await Note.create({
      user: req.user._id,
      title,
      content,
      isRichText: isRichText || false,
      tags: tags || [],
      category,
    });

    await note.populate('category', 'name');

    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { title, content, isRichText, tags, category } = req.body;

    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (title) note.title = title;
    if (content) note.content = content;
    if (isRichText !== undefined) note.isRichText = isRichText;
    if (tags) note.tags = tags;
    if (category !== undefined) note.category = category;

    await note.save();
    await note.populate('category', 'name');

    res.json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
