const Note = require("../models/note");

exports.getNote = async(req, res) => {
    try{
        const note = await Note.find();
        res.status(200).json({
            status:'success',
            data:{
        note:note,
    }
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createNote = async(req, res) =>{
    try{
    const { title, content } = req.body;

    const note  = await Note.create({title, content})
    res.status(201).json({
    status:'created',
    data:{
        note:note,
    }

});
   
    } catch (error){
        res.status(400).json({message:error.message});
    }
};
