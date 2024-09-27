export const notesReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTES":
      return {
        ...state,
        notes: action.payload,
      };
    case "CREATE_NOTE":
      return {
        ...state,
        notes: [action.payload, ...state.notes],
      };
    case "UPDATE_NOTE":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note._id === action.payload._id ? action.payload : note
        ),
      };
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== action.payload),
      };
    default:
      return state;
  }
};
