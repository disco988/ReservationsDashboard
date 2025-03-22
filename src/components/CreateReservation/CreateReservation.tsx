import React, { useState } from "react";
import { Reservation } from "../../types/reservation";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/dateFormatters";
import Form from "../Form/Form";
import Modal from "../Modal/Modal";

type createReservationProps = {
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>;
  nextReservationId: string;
};

const CreateReservation: React.FC<createReservationProps> = ({
  setReservations,
  nextReservationId,
}) => {
  const [reservationErrors, setReservationErrors] = useState<string[]>([]);
  const [reservationModal, setReservationModal] = useState(false);

  const navigate = useNavigate();

  const [reservationForm, setReservationForm] = useState<
    Omit<Reservation, "id"> & { status?: "Reserved" }
  >({
    guestName: "",
    checkInDate: "",
    checkOutDate: "",
    roomNumber: "",
    notes: "",
    email: "",
    status: "Reserved",
  });

  const handleChangeReservationForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setReservationForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateReservation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setReservationErrors([]);

    const errors: string[] = [];

    if (!reservationForm.guestName.trim()) {
      errors.push("Uzupełnij Imie i Nazwisko");
    }
    if (!reservationForm.checkOutDate) {
      errors.push("Uzupełnij date wyjazdu");
    }
    if (!reservationForm.checkInDate) {
      errors.push("Uzupełnij date przyjazdu");
    }
    if (!nextReservationId.trim()) {
      console.error(
        "Brak przypisanego ID rezerwacji, sprawdz komponent App| NextReservationId"
      );
      errors.push(
        "Wystąpił błąd podczas tworzenia rezerwacji skontaktuj sie z supportem: support@turbo_fajne_aplikacje.com"
      );
    }
    if (reservationForm.checkInDate > reservationForm.checkOutDate) {
      errors.push(
        "Data wyjazdu gościa nie moze byc wcześniejsza od daty przyjazdu"
      );
    }

    if (errors.length > 0) {
      setReservationErrors(errors);
      setReservationModal(true);
      return;
    }

    const checkInDate = formatDate(reservationForm.checkInDate);

    const status = checkInDate > formatDate("") ? "Reserved" : "Due In";

    const newReservation: Reservation = {
      id: nextReservationId,
      guestName: reservationForm.guestName,
      checkInDate: reservationForm.checkInDate,
      checkOutDate: reservationForm.checkOutDate,
      status: status,
      roomNumber: reservationForm.roomNumber,
      notes: reservationForm.notes,
      email: reservationForm.email,
    };

    setReservations((prevState) => [...prevState, newReservation]);

    navigate("/");
  };

  const handleCloseReservationModal = () => {
    setReservationModal(false);
  };

  return (
    <div>
      {reservationModal && (
        <Modal
          errors={reservationErrors}
          handleCloseModal={handleCloseReservationModal}
          creation={true}
        />
      )}
      <Form
        handleSubmit={handleCreateReservation}
        reservation={reservationForm}
        handleChange={handleChangeReservationForm}
        allowEditing={true}
        creation={true}
      />
    </div>
  );
};

export default CreateReservation;
