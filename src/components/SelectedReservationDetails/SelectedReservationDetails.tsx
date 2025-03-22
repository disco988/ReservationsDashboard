import { Reservation } from "../../types/reservation";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/dateFormatters";
import Form from "../Form/Form";
import Modal from "../Modal/Modal";
type SelectedReservationDetailsProps = {
  reservations: Reservation[];
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>;
};

const SelectedReservationDetails: React.FC<SelectedReservationDetailsProps> = ({
  reservations,
  setReservations,
}) => {
  const navigate = useNavigate();

  const [confirmationMessage, setConfirmationMessage] = useState<string>("");

  const [reservationEditErrors, setReservationEditErrors] = useState<string[]>(
    []
  );

  const [reservationEditModal, setReservationEditModal] =
    useState<boolean>(false);

  const [reservationForEdit, setReservationForEdit] = useState<Reservation>({
    id: "",
    guestName: "",
    checkInDate: "",
    checkOutDate: "",
    status: "Reserved",
    roomNumber: "",
    notes: "",
    email: "",
  });

  const [allowEditing, setAllowEditing] = useState<boolean>(true);

  const selectedReservationId = useParams().id;

  const selectedReservation = reservations.find(
    (reservation) => reservation.id === selectedReservationId
  );

  useEffect(() => {
    if (selectedReservation) {
      setReservationForEdit(selectedReservation);

      if (!["Reserved", "Due In"].includes(selectedReservation.status)) {
        setAllowEditing(false);
      }
    }
  }, [selectedReservation]);

  const handleChangeReservationDetails = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setReservationForEdit((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitEditedReservation = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const errors: string[] = [];

    const checkInDate = formatDate(reservationForEdit.checkInDate);
    const checkOutDate = formatDate(reservationForEdit.checkOutDate);

    if (checkInDate > checkOutDate) {
      errors.push(
        "Data wyjazdu gościa nie może byc wczesniejsza od daty przyjazdu"
      );
    }

    if (errors.length > 0) {
      setReservationEditErrors(errors);
      setReservationEditModal(true);
      return;
    }

    setReservations((prevState) =>
      prevState.map((reservation) =>
        reservation.id === reservationForEdit.id
          ? reservationForEdit
          : reservation
      )
    );

    setConfirmationMessage("Rezerwacja została zaktualizowana");
  };

  const handleCloseReservationEditModal = () => {
    setReservationEditModal(false);
  };

  const handleRemoveReservation = () => {
    setReservations((prevState) =>
      prevState.filter(
        (reservation) => reservation.id !== selectedReservationId
      )
    );
    navigate("/");
  };
  return (
    <div>
      {reservationEditModal && (
        <Modal
          errors={reservationEditErrors}
          handleCloseModal={handleCloseReservationEditModal}
        />
      )}
      {!selectedReservation ? (
        <p>Nie mozna odnaleźć rezerwacji</p>
      ) : (
        <Form
          handleRemove={handleRemoveReservation}
          reservation={reservationForEdit}
          handleChange={handleChangeReservationDetails}
          handleSubmit={handleSubmitEditedReservation}
          allowEditing={allowEditing}
          confirmationMessage={confirmationMessage}
        />
      )}
    </div>
  );
};

export default SelectedReservationDetails;
