import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1>Dashboard Rezerwacji Hotelowych</h1>
        </div>
        <button className="btn-add" onClick={() => navigate("/add")}>
          Dodaj rezerwacje
        </button>
        <div className="header-actions">
          <div className="date-display">
            {new Date().toLocaleDateString("pl-PL", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
