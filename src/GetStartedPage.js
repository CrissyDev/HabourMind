import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTruck, FaChartLine, FaShip, FaUserShield, FaArrowLeft } from "react-icons/fa";
import "./GetStartedPage.css";

function GetStartedPage() {
  const navigate = useNavigate();

  const roles = [
    {
      title: "Truck Driver",
      description:
        "Optimize your routes, track fuel consumption, and get real-time AI assistance while on the road.",
      color: "#007bff",
      icon: <FaTruck size={40} />,
      features: [
        "Real-time route optimization",
        "Fuel efficiency tracking",
        "AI-powered navigation",
        "Performance rewards",
        "24/7 support chat",
      ],
      path: "/truck-driver",
    },
    {
      title: "Logistics Manager",
      description:
        "Monitor your entire fleet, analyze performance metrics, and make data-driven decisions.",
      color: "#6f42c1",
      icon: <FaChartLine size={40} />,
      features: [
        "Fleet performance analytics",
        "Real-time tracking dashboard",
        "Driver performance metrics",
        "Predictive insights",
        "Custom reports",
      ],
      path: "/logistics-manager",
    },
    {
      title: "Freight Forwarding Agent",
      description:
        "Manage shipments, coordinate cargo, and streamline freight forwarding operations.",
      color: "#17a2b8",
      icon: <FaShip size={40} />,
      features: [
        "Shipment tracking",
        "Cargo coordination",
        "Automated scheduling",
        "Client notifications",
        "Documentation management",
      ],
      path: "/freight-agent",
    },
    {
      title: "Port Authority Officer",
      description:
        "Oversee port operations, ensure compliance, and manage traffic flow efficiently.",
      color: "#0056b3",
      icon: <FaUserShield size={40} />,
      features: [
        "Port operations oversight",
        "Compliance monitoring",
        "Traffic management",
        "Environmental tracking",
        "Incident reporting",
      ],
      path: "/port-authority",
    },
  ];

  const handleContinue = (path) => {
    navigate(path);
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="get-started-page">
      <h2 className="page-title">Choose Your Role</h2>
      <p className="page-subtitle">
        Select your role to get started with HarborMind. Each role has a customized experience tailored to your needs.
      </p>

      <div className="roles-grid">
        {roles.map((role, index) => (
          <div
            className="role-card"
            key={index}
            style={{ borderColor: role.color }}
          >
            <div className="role-header" style={{ backgroundColor: role.color }}>
              <div className="role-icon">{role.icon}</div>
              <h3>{role.title}</h3>
            </div>
            <p className="role-description">{role.description}</p>

            <ul className="feature-list">
              {role.features.map((f, i) => (
                <li key={i}>• {f}</li>
              ))}
            </ul>

            <button
              className="continue-btn"
              style={{ backgroundColor: role.color }}
              onClick={() => handleContinue(role.path)}
            >
              Continue as {role.title}
            </button>
          </div>
        ))}
      </div>

      <button className="back-btn" onClick={handleBack}>
        <FaArrowLeft style={{ marginRight: "8px" }} /> Back to Home
      </button>
    </div>
  );
}

export default GetStartedPage;
