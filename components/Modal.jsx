'use client'

const Modal = ({ isOpen, onClose, item, handleDelete }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal">
        <img key={item.id} src={item.url} alt={item.title} />
        <button onClick={() => handleDelete(item.content_id)}>Delete</button>
        <button onClick={onClose}>Close</button>
      </div>
    );
  };

  export default Modal;
  