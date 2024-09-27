import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define the schema for the "Notes" collection
const NoteSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Note", NoteSchema);
