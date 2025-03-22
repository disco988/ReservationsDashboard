import "./Modal.css";
type ModalProps = {
  errors: string[];
  handleCloseModal: () => void;
  creation?: boolean;
};

const Modal: React.FC<ModalProps> = ({
  handleCloseModal,
  errors,
  creation,
}) => {
  return (
    <div className="error-modal">
      {creation && <p>Twoja rezerwacja nie została utworzona</p>}
      <ul>
        {errors.map((error: string, index: number) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
      <button onClick={handleCloseModal} className="btn-modal">
        Zamknij
      </button>
    </div>
  );
};

export default Modal;
