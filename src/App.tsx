import { useState, useEffect } from "react";
import "./App.css";
import ReservationBoard from "./components/ReservationsDashboard/ReservationBoard";
import Header from "./components/Header/Header";
import { Reservation } from "./types/reservation";
import reservationsData from "./data/reservations.json";
import { mapResponseObjectToReservation } from "./utils/reservationUtils";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateReservation from "./components/CreateReservation/CreateReservation";
import SelectedReservationDetails from "./components/SelectedReservationDetails/SelectedReservationDetails";

function App() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextReservationId, setNextReservationId] = useState("");

  useEffect(() => {
    setTimeout(() => {
      try {
        const validReservations = reservationsData.map(
          mapResponseObjectToReservation
        );
        setReservations(validReservations);
      } catch (error) {
        console.error("Błąd podczas przetwarzania danych rezerwacji:", error);
      } finally {
        setLoading(false);
      }
    }, 800);
  }, []);

  useEffect(() => {
    if (reservations.length === 0) {
      setNextReservationId("res-000");
      return;
    }

    const lastReservationId = reservations[reservations.length - 1].id;

    let lastReservationIdNumber = parseInt(lastReservationId.split("-")[1]);

    lastReservationIdNumber = lastReservationIdNumber + 1;

    setNextReservationId(
      `res-${lastReservationIdNumber.toString().padStart(3, "0")}`
    );
  }, [reservations]);

  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          {loading ? (
            <div className="loading">Ładowanie danych rezerwacji...</div>
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  <ReservationBoard
                    reservations={reservations}
                    setReservations={setReservations}
                  />
                }
              ></Route>
              <Route
                path="/add"
                element={
                  <CreateReservation
                    nextReservationId={nextReservationId}
                    setReservations={setReservations}
                  />
                }
              ></Route>
              <Route
                path="/edit/:id"
                element={
                  <SelectedReservationDetails
                    reservations={reservations}
                    setReservations={setReservations}
                  />
                }
              ></Route>
            </Routes>
          )}
        </main>
      </div>
    </Router>
  );
}

export default App;
