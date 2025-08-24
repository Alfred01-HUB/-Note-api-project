const mongoose = require ('mongoose');

const NoteSchema = new mongoose.Schema(
    {
        title: {
            type : String,
            required:[true,'note must have a title or header'],
        },
        content: {
            type: String,
            required: [true, 'note must have a body']
        },
    },
    {timestamps: true }
);
const Note = mongoose.model('note' , NoteSchema);

module.exports = Note;