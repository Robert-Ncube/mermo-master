import AddBoxIcon from "@mui/icons-material/AddBox";
import PropTypes from "prop-types";

const Links = ({ handleCreateNote }) => {
  return (
    <div className="flex justify-end gap-4">
      <button
        className="bg-slate-400 p-2 rounded-md hover:bg-slate-500"
        onClick={handleCreateNote}
      >
        <AddBoxIcon />
        New Note
      </button>
    </div>
  );
};

Links.propTypes = {
  handleCreateNote: PropTypes.func.isRequired,
};

export default Links;
