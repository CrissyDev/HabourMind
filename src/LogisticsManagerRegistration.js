import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LogisticsManagerRegistration.css";

export default function LogisticsManagerRegistration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    position: "",
    fleetSize: "",
    password: "",
    confirmPassword: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);

    // ✅ Validate form fields
    const allFieldsFilled = Object.values(updatedForm).every(
      (field) => field.trim() !== ""
    );
    const passwordsMatch =
      updatedForm.password === updatedForm.confirmPassword &&
      updatedForm.password.length >= 4;

    setIsFormValid(allFieldsFilled && passwordsMatch);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    console.log("Manager Registration Data:", formData);
    localStorage.setItem("managerData", JSON.stringify(formData));

    // Redirect to dashboard (or confirmation page)
    navigate("/dashboard/manager");
  };

  return (
    <div className="manager-register-container">
      <div className="register-card">
        <h2 className="register-title">Logistics Manager Registration</h2>
        <p className="register-subtitle">
          Create your account to manage your fleet
        </p>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Jane Smith"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="+254 712 345 678"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              placeholder="Your Logistics Company"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Position</label>
            <input
              type="text"
              name="position"
              placeholder="Fleet Manager"
              value={formData.position}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Fleet Size</label>
            <input
              type="number"
              name="fleetSize"
              placeholder="e.g., 50 vehicles"
              value={formData.fleetSize}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className={`register-btn ${isFormValid ? "active" : ""}`}
          >
            Create Manager Account
          </button>

          <p className="signin-text">
            Already have an account?{" "}
            <span className="signin-link" onClick={() => navigate("/login")}>
              Sign in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
