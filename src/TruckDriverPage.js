import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import "./TruckDriverPage.css";

export default function TruckDriverPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    license: "",
    vehicleReg: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // ✅ Validation logic
  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Enter a valid email";
    if (!/^\+?\d{10,15}$/.test(form.phone))
      newErrors.phone = "Enter a valid phone number";
    if (!form.license.trim())
      newErrors.license = "Driver license number is required";
    if (!form.vehicleReg.trim())
      newErrors.vehicleReg = "Vehicle registration number is required";
    if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (form.confirmPassword !== form.password)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [form]);

  useEffect(() => {
    validateForm();
  }, [form, validateForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();

    if (!isValid) return;

    // 🎈 Trigger confetti and success message
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      alert("🎉 Driver account created successfully!");
      navigate("/dashboard/driver");
    }, 3000);
  };

  return (
    <div className="driver-container">
      {showConfetti && <Confetti recycle={false} numberOfPieces={300} />}
      <div className="driver-form-card">
        <h2>Truck Driver Registration</h2>
        <p className="subtitle">
          Create your account to start optimizing your routes
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="John Doe"
              value={form.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <small>{errors.fullName}</small>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <small>{errors.email}</small>}
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="+254 712 345 678"
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && <small>{errors.phone}</small>}
          </div>

          <div className="form-group">
            <label>Driver License Number</label>
            <input
              type="text"
              name="license"
              placeholder="DL123456789"
              value={form.license}
              onChange={handleChange}
            />
            {errors.license && <small>{errors.license}</small>}
          </div>

          <div className="form-group">
            <label>Vehicle Registration Number</label>
            <input
              type="text"
              name="vehicleReg"
              placeholder="KBZ 123A"
              value={form.vehicleReg}
              onChange={handleChange}
            />
            {errors.vehicleReg && <small>{errors.vehicleReg}</small>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && <small>{errors.password}</small>}
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <small>{errors.confirmPassword}</small>
            )}
          </div>

          <button
            type="submit"
            className={`submit-btn ${isValid ? "active" : ""}`}
            disabled={!isValid}
          >
            Create Driver Account
          </button>
        </form>
      </div>
    </div>
  );
}
