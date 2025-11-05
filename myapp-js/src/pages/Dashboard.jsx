// src/pages/Dashboard.jsx
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const { token, logout } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate("/login");

    axios
      .get("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data.user))
      .catch(() => navigate("/login"));
  }, [token, navigate]);

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h2 className="font-[Poppins] text-3xl font-bold mb-4">Dashboard</h2>
      {user ? (
        <div className="space-y-4">
          <p>Welcome, <strong>{user.fullName}</strong></p>
          <p>Email: {user.email}</p>
          <button onClick={logout} className="btn-primary w-full mt-4">
            Logout
          </button>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
