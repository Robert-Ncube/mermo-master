import PropTypes from "prop-types";
import { createContext, useReducer } from "react";
import { notesReducer } from "./notesReducer";

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, {
    notes: [],
  });

  return (
    <NotesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};

NotesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
