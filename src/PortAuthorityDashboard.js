import React, { useState, useEffect } from "react";
import "./PortAuthorityDashboard.css";
import {
  FaTruckLoading,
  FaCogs,
  FaChartLine,
  FaBoxes,
  FaMapMarkedAlt,
} from "react-icons/fa";
import logo from "./asessts/HabourMind Logo.png"; 

export default function PortAuthorityDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Simulated forklift & cargo data
  const [forklifts, setForklifts] = useState([
    { id: 1, name: "Forklift A", status: "Active", load: "2.5T", location: "Dock 1" },
    { id: 2, name: "Forklift B", status: "Idle", load: "0T", location: "Warehouse" },
    { id: 3, name: "Forklift C", status: "Active", load: "1.8T", location: "Dock 3" },
  ]);

  const [cargoQueue, setCargoQueue] = useState([
    { id: 101, name: "Steel Bars", priority: "High", weight: "4T", status: "Waiting" },
    { id: 102, name: "Vehicle Parts", priority: "Medium", weight: "2T", status: "Loading" },
    { id: 103, name: "Textiles", priority: "Low", weight: "1.2T", status: "Queued" },
  ]);

  const [alerts, setAlerts] = useState([
    { id: 1, message: "Forklift B due for maintenance", level: "Warning" },
    { id: 2, message: "Low fuel on Forklift C", level: "Critical" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setForklifts((prev) =>
        prev.map((f) =>
          f.status === "Active"
            ? { ...f, load: (Math.random() * 3).toFixed(1) + "T" }
            : f
        )
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="overview-section">
            <h2>Operational Overview</h2>
            <div className="cards-container">
              <div className="summary-card">
                <FaTruckLoading className="icon" />
                <h3>{forklifts.filter((f) => f.status === "Active").length}</h3>
                <p>Active Forklifts</p>
              </div>
              <div className="summary-card">
                <FaBoxes className="icon" />
                <h3>{cargoQueue.length}</h3>
                <p>Pending Cargo</p>
              </div>
              <div className="summary-card">
                <FaCogs className="icon" />
                <h3>{alerts.length}</h3>
                <p>Maintenance Alerts</p>
              </div>
            </div>
          </div>
        );

      case "cargo":
        return (
          <div className="cargo-section">
            <h2>Cargo Queue</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Item</th>
                  <th>Priority</th>
                  <th>Weight</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {cargoQueue.map((cargo) => (
                  <tr key={cargo.id}>
                    <td>{cargo.id}</td>
                    <td>{cargo.name}</td>
                    <td>{cargo.priority}</td>
                    <td>{cargo.weight}</td>
                    <td>{cargo.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "tracker":
        return (
          <div className="tracker-section">
            <h2>Forklift Tracker</h2>
            <div className="forklift-grid">
              {forklifts.map((f) => (
                <div key={f.id} className={`forklift-card ${f.status.toLowerCase()}`}>
                  <h3>{f.name}</h3>
                  <p>Status: <span>{f.status}</span></p>
                  <p>Current Load: {f.load}</p>
                  <p>Location: {f.location}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "alerts":
        return (
          <div className="alerts-section">
            <h2>Maintenance Alerts</h2>
            <ul>
              {alerts.map((a) => (
                <li key={a.id} className={a.level.toLowerCase()}>
                  {a.message}
                </li>
              ))}
            </ul>
          </div>
        );

      case "reports":
        return (
          <div className="reports-section">
            <h2>Performance Reports</h2>
            <p>Coming soon — integrate analytics here (usage rates, delays, etc.)</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header Navbar */}
      <header className="top-navbar">
        <div className="logo-section">
          <img src={logo} alt="HarborMind Logo" className="logo" />
          <h1>HarborMind Port Authority Dashboard</h1>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="dashboard-nav">
        <ul>
          <li
            onClick={() => setActiveTab("overview")}
            className={activeTab === "overview" ? "active" : ""}
          >
            <FaChartLine /> Overview
          </li>
          <li
            onClick={() => setActiveTab("cargo")}
            className={activeTab === "cargo" ? "active" : ""}
          >
            <FaBoxes /> Cargo Queue
          </li>
          <li
            onClick={() => setActiveTab("tracker")}
            className={activeTab === "tracker" ? "active" : ""}
          >
            <FaMapMarkedAlt /> Forklift Tracker
          </li>
          <li
            onClick={() => setActiveTab("alerts")}
            className={activeTab === "alerts" ? "active" : ""}
          >
            <FaCogs /> Alerts
          </li>
          <li
            onClick={() => setActiveTab("reports")}
            className={activeTab === "reports" ? "active" : ""}
          >
            <FaChartLine /> Reports
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="dashboard-content">{renderContent()}</main>
    </div>
  );
}
