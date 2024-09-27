import { NotesContext } from "../context/notesContext";
import { useContext } from "react";

export const useNotesContext = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotesContext must be used within a NotesProvider");
  }
  return context;
};
