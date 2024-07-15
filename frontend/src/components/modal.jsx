import React from 'react';
// import './modal.css'; 

const Modal = ({ isOpen, onClose, onSubmit, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <form onSubmit={onSubmit}>
          {children}
          <button type="submit" className="modal-submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
