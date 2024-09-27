import PropTypes from "prop-types";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNotesContext } from "../hooks/useNotesContext";

const NoteCard = ({ note, onEdit }) => {
  const { dispatch } = useNotesContext();

  const deleteNote = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/notes/${note._id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      dispatch({ type: "DELETE_NOTE", payload: note._id });
    } catch (error) {
      console.error("Failed to delete note:", error);
      return;
    }
  };

  return (
    <div
      className="max-w-lg rounded overflow-hidden shadow-sm shadow-black"
      key={note._id}
    >
      <header className="bg-slate-400 p-2 flex flex-row items-center justify-between">
        <h2 className="font-bold text-xl mb-2">{note.title}</h2>
        <div className="flex flex-row gap-2">
          <button
            className="bg-slate-200 p-1 rounded-lg hover:bg-slate-600"
            onClick={() => onEdit(note)}
          >
            <EditNoteIcon />
          </button>
          <button
            className="bg-slate-200 p-1 rounded-lg hover:bg-slate-600"
            onClick={deleteNote}
          >
            <DeleteIcon />
          </button>
        </div>
      </header>
      <main className="px-2 h-40 overflow-auto">
        <p className="text-gray-700 text-base mb-4">{note.content}</p>
      </main>
      <footer className="flex justify-between items-center p-2">
        <span className="text-gray-800 text-sm bg-slate-400 p-2 rounded-lg">
          {note.createdAt < note.updatedAt
            ? `Updated: ${new Date(note.updatedAt).toLocaleString()}`
            : `Created: ${new Date(note.createdAt).toLocaleString()}`}
        </span>
      </footer>
    </div>
  );
};

NoteCard.propTypes = {
  note: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default NoteCard;
