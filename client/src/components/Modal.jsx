import PropTypes from "prop-types";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-slate-200 p-4 rounded shadow-lg max-w-md w-full">
        <button
          className="text-right font-bold bg-slate-400 hover:bg-slate-600 p-2 rounded-lg my-2"
          onClick={onClose}
        >
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
