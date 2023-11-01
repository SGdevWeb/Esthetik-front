import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { newLocation, axiosConfig } from "../../api/locations";
import RepetitiveSlots from "../../components/Admin/RepetitiveSlots/RepetitiveSlots";
import AppointmentList from "../../components/Admin/AppointmentList/AppointmentList";

function AdminHome() {
  const navigate = useNavigate();
  const { logout, token } = useAuth();

  const [location, setLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleLogout() {
    logout();
    navigate("/admin/signin");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await newLocation(
        { name: location },
        axiosConfig(token)
      );
      console.log("response", response);
      if (response.status === 201) {
        setLocation("");
        setErrorMessage("");
      } else {
        console.log("response", response);
        const { message } = response.data;
        setErrorMessage("Erreur lors de la création de la ville : " + message);
      }
    } catch (error) {
      setErrorMessage(
        "Erreur lors de la création de la ville : " + error.message
      );
    }
  }

  return (
    <div>
      <h1>AdminHome</h1>
      <h2>Location</h2>
      <form>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Entrer une nouvelle ville"
        />
        <button onClick={handleSubmit}>Valider</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      <button onClick={handleLogout}>deconnexion</button>
      <div>
        <RepetitiveSlots />
      </div>
      <div>
        <AppointmentList />
      </div>
    </div>
  );
}

export default AdminHome;
