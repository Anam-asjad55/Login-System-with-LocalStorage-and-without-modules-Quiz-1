// src/pages/Login.jsx
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);

      if (res.status === 200 && res.data.token) {
        // Save token using AuthContext (this also puts it in localStorage)
        login(res.data.token);

        // Save user info separately (optional)
        localStorage.setItem("user", JSON.stringify(res.data.token));

        alert("Login successful!");
        navigate("/dashboard");
      } else {
        alert(res.data.error || "Login failed");
      }
    } catch (err) {
      alert("Server error during login");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h2 className="font-[Poppins] text-3xl font-bold">Login</h2>
      <form onSubmit={submit} className="tile space-y-4">
        <label className="flex flex-col">
          <span>Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </label>
        <label className="flex flex-col">
          <span>Password</span>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </label>
        <button className="btn-primary w-full">Login</button>
        <p>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}
