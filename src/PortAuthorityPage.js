import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PortAuthorityPage.css";

export default function PortAuthorityPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    badge: "",
    authority: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.includes("@")) newErrors.email = "Valid email is required";
    if (!formData.phone.match(/^\+?\d{10,15}$/))
      newErrors.phone = "Enter a valid phone number";
    if (!formData.department.trim()) newErrors.department = "Department is required";
    if (!formData.badge.trim()) newErrors.badge = "Badge number is required";
    if (!formData.authority.trim()) newErrors.authority = "Authority is required";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      alert("Registration successful!");
      navigate("/portauthority-dashboard"); // redirect after registration
    }
  };

  return (
    <div className="port-page">
      <div className="port-container">
        <form className="port-form" onSubmit={handleSubmit}>
          <h2>Port Authority Registration</h2>
          <p className="subtitle">
            Create your account to manage port operations
          </p>

          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Captain Mwangi"
          />
          {errors.fullName && <span className="error">{errors.fullName}</span>}

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="mwangi@portauthority.ke"
          />
          {errors.email && <span className="error">{errors.email}</span>}

          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+254 712 345 678"
          />
          {errors.phone && <span className="error">{errors.phone}</span>}

          <label>Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="e.g., Operations, Security"
          />
          {errors.department && <span className="error">{errors.department}</span>}

          <label>Badge Number</label>
          <input
            type="text"
            name="badge"
            value={formData.badge}
            onChange={handleChange}
            placeholder="PA123456"
          />
          {errors.badge && <span className="error">{errors.badge}</span>}

          <label>Authority</label>
          <input
            type="text"
            name="authority"
            value={formData.authority}
            onChange={handleChange}
            placeholder="Port Authority Kenya"
          />
          {errors.authority && <span className="error">{errors.authority}</span>}

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          {errors.password && <span className="error">{errors.password}</span>}

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}

          <button type="submit" className="submit-btn">
            Register
          </button>

          <p className="signin-text">
            Already have an account? <a href="#">Sign in</a>
          </p>
        </form>
      </div>
    </div>
  );
}
