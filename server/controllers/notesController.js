import mongoose from "mongoose";
import Note from "../models/notesModel.js";

//Get all notes
export const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find().sort({
      createdAt: -1, // Sort by createdAt in descending order
    });
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

//Get single note
export const getNoteById = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ error: "Note not found!" });
    }
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "Note not found!" });
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

//Create a new note
export const createNote = async (req, res, next) => {
  const { title, content } = req.body;

  try {
    const newNote = await Note.create({
      title,
      content,
    });
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

//Update a note
export const updateNote = async (req, res, next) => {
  const { title, content } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ error: "Note not found!" });
    }
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found!" });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

//Delete a note
export const deleteNote = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ error: "Note not found!" });
    }
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found!" });
    }
    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    next(error);
  }
};
