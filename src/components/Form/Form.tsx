import { useNavigate } from "react-router-dom";
import { Reservation } from "../../types/reservation";
import { handleAllowedStatuses } from "../../utils/AllowedStatusesUtils";
import "./Form.css";

type FormProps = {
  confirmationMessage?: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  reservation: Omit<Reservation, "id" | "status"> &
    Partial<Pick<Reservation, "status">>;
  handleRemove?: () => void;
  allowEditing?: boolean;
  creation?: boolean;
};

const Form: React.FC<FormProps> = ({
  confirmationMessage,
  handleSubmit,
  handleChange,
  reservation,
  handleRemove,
  allowEditing,
  creation,
}) => {
  const navigate = useNavigate();

  const allowedStatuses = reservation.status
    ? handleAllowedStatuses(reservation.status)
    : [];

  return (
    <div className="form-container">
      {confirmationMessage && (
        <p className="confirmation-message">{confirmationMessage}</p>
      )}
      <form onSubmit={handleSubmit} className="selected-form">
        <label className="label-form">
          Imie i Nazwisko:
          <input
            type="text"
            value={reservation.guestName || ""}
            name="guestName"
            onChange={handleChange}
            disabled={!allowEditing}
            className="input-form"
          />
        </label>
        {!creation && (
          <label className="label-form">
            Status:
            <select
              name="status"
              value={reservation.status}
              onChange={handleChange}
              className="input-form"
            >
              {allowedStatuses.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
        )}
        <label className="label-form">
          Data Przyjazdu:
          <input
            type="date"
            value={reservation.checkInDate || ""}
            name="checkInDate"
            onChange={handleChange}
            disabled={!allowEditing}
            className="input-form"
            onFocus={(e) => e.target.showPicker()}
          />
        </label>
        <label className="label-form">
          Data Wyjazdu:
          <input
            type="date"
            value={reservation.checkOutDate || ""}
            name="checkOutDate"
            onChange={handleChange}
            disabled={!allowEditing}
            className="input-form"
            onFocus={(e) => e.target.showPicker()}
          />
        </label>
        <label className="label-form">
          Numer Pokoju:
          <input
            type="text"
            value={reservation.roomNumber || ""}
            name="roomNumber"
            onChange={handleChange}
            disabled={!allowEditing}
            className="input-form"
          />
        </label>
        <label className="label-form">
          Notatki:
          <input
            type="text"
            value={reservation.notes || ""}
            name="notes"
            onChange={handleChange}
            disabled={!allowEditing}
            className="input-form"
          />
        </label>
        <label className="label-form">
          Email:
          <input
            type="email"
            value={reservation.email || ""}
            name="email"
            onChange={handleChange}
            disabled={!allowEditing}
            className="input-form"
          />
        </label>
        <div className="btn-form-container">
          <button type="submit" className="btn-form">
            Zapisz zmiany
          </button>
          <button onClick={() => navigate("/")} className="btn-form">
            Wróć
          </button>
          {handleRemove && (
            <button onClick={handleRemove} className="btn-form">
              Usuń
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
