// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form);

      if (res.status === 201) {
        alert("Registration Successful! Please login.");
        navigate("/login");
      } else {
        alert(res.data.error || "Registration failed");
      }
    } catch (err) {
      alert("Server error during registration");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h2 className="font-[Poppins] text-3xl font-bold">Register</h2>
      <form onSubmit={submit} className="tile space-y-4">
        <label className="flex flex-col">
          <span>Name</span>
          <input
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            required
          />
        </label>
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
        <button className="btn-primary w-full">Create account</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
