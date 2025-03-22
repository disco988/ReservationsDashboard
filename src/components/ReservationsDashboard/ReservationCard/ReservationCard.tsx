import React, { useState } from "react";
import { Reservation, ReservationStatus } from "../../../types/reservation";
import { formatDate } from "../../../utils/dateFormatters";
import "./ReservationCard.css";
import { useNavigate } from "react-router-dom";
import { handleAllowedStatuses } from "../../../utils/AllowedStatusesUtils";

interface ReservationCardProps {
  reservation: Reservation;
  statusColor: string;
  handleChangeReservationStatus: (
    id: string,
    newStatus: ReservationStatus
  ) => void;
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  reservation,
  statusColor,
  handleChangeReservationStatus,
}) => {
  const navigate = useNavigate();

  const handleSelectReservation = () => {
    navigate(`/edit/${reservation.id}`);
  };

  const [select, setSelect] = useState(false);
  const [newReservationStatus, setNewReservationStatus] = useState(
    reservation.status
  );

  const showSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelect(true);
  };

  const handleSetStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as ReservationStatus;
    setNewReservationStatus(newStatus);
    handleChangeReservationStatus(reservation.id, newStatus);
  };

  const allowedStatuses = handleAllowedStatuses(reservation.status);

  return (
    <div className="reservation-card" onClick={handleSelectReservation}>
      <div
        className="card-status-indicator"
        style={{ backgroundColor: statusColor }}
      ></div>
      <div className="card-content">
        <div className="card-header">
          <h3 className="guest-name">{reservation.guestName}</h3>
          <div className="action-button" onClick={showSelect}>
            {select && (
              <select
                name="status"
                value={newReservationStatus}
                onChange={handleSetStatus}
                onBlur={() => setSelect(false)}
              >
                {allowedStatuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            )}
            <button className="btn-action">{select ? null : "⋮"}</button>
          </div>
        </div>

        <div className="stay-dates">
          <div className="date-range">
            <span className="date-label">Przyjazd:</span>
            <span className="date-value">
              {formatDate(reservation.checkInDate)}
            </span>
          </div>
          <div className="date-range">
            <span className="date-label">Wyjazd:</span>
            <span className="date-value">
              {formatDate(reservation.checkOutDate)}
            </span>
          </div>
        </div>

        {reservation.roomNumber && (
          <div className="room-number">
            <span className="room-label">Pokój:</span>
            <span className="room-value">{reservation.roomNumber}</span>
          </div>
        )}

        {reservation.notes && (
          <div className="notes">
            <p>{reservation.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationCard;
