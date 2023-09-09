import React from "react";
import { useNavigate } from "react-router-dom";

function AdminHome() {
  const navigate = useNavigate();
  function handleClick() {
    localStorage.removeItem("token");
    navigate("/admin/signin");
  }

  return (
    <div>
      <h1>AdminHome</h1>
      <button onClick={handleClick}>deconnexion</button>
    </div>
  );
}

export default AdminHome;
