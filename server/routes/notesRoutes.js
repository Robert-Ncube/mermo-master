import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from "../controllers/notesController.js";

const router = new express.Router();

//Get all notes
router.get("/", getAllNotes);

//Get single note
router.get("/:id", getNoteById);

//Create a new note
router.post("/", createNote);

//Update a note
router.patch("/:id", updateNote);

//Delete a note
router.delete("/:id", deleteNote);

export default router;
