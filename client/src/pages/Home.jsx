import { useEffect, useState } from "react";
import { useNotesContext } from "../hooks/useNotesContext";
import NoteCard from "../components/Note";
import Links from "../components/Links";
import Modal from "../components/Modal";
import NotesForm from "../components/NotesForm";

const Home = () => {
  const { notes, dispatch } = useNotesContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  const handleCreateNote = () => {
    setIsModalOpen(true);
    setCurrentNote(null);
  };

  const handleEditNote = (note) => {
    setIsModalOpen(true);
    setCurrentNote(note);
  };

  const handleSaveNote = async (note) => {
    try {
      let response;
      if (note._id) {
        // Update existing note
        response = await fetch(`http://localhost:3000/api/notes/${note._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(note),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const updatedNote = await response.json();
        dispatch({ type: "UPDATE_NOTE", payload: updatedNote });
      } else {
        // Create new note
        response = await fetch(`http://localhost:3000/api/notes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(note),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const newNote = await response.json();
        dispatch({ type: "CREATE_NOTE", payload: newNote });
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to save note:", error);
    }
  };

  useEffect(() => {
    // Fetch notes from API
    const fetchNotesData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/notes/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        dispatch({ type: "SET_NOTES", payload: data });
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };
    fetchNotesData();
  }, [dispatch]);

  return (
    <main className="bg-slate-200 h-auto min-h-screen flex flex-col items-center justify-center p-6 gap-4">
      <Links handleCreateNote={handleCreateNote} />

      {notes &&
        (notes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-4">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} onEdit={handleEditNote} />
            ))}
          </div>
        ) : (
          <div className="text-center w-full">
            <p className="text-gray-600 text-xl">
              No notes found. Create a new note.
            </p>
          </div>
        ))}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NotesForm note={currentNote} onSave={handleSaveNote} />
      </Modal>
    </main>
  );
};

export default Home;
