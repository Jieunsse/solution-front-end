import PropTypes from 'prop-types';

function Modal({ message, title, onClose }) {
  return (
    <div className="fixed top-0 max-w-[500px] w-full h-full flex justify-center items-center">
      <div className="fixed top-0 left-0 w-full h-screen bg-black opacity-50"></div>
      <div className="fixed left-22 bg-white p-6 border border-gray-300 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold mb-4">{title}</h1>
        <p className="text-sm text-gray-600 mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            className="mr-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  message: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
