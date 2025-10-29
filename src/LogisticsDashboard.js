import React, { useEffect, useState } from "react";
import {
  FaMapMarkedAlt,
  FaChartBar,
  FaComments,
  FaBolt,
  FaPaperPlane,
  FaArrowUp,
  FaArrowDown,
  FaExclamationTriangle,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import "./LogisticsDashboard.css";

function LogisticsDashboard() {
  const [manager, setManager] = useState({
    fullName: "",
    email: "",
    companyName: "",
    position: "",
    fleetSize: "",
  });
  const [activeTab, setActiveTab] = useState("fleet");
  const [showInsights, setShowInsights] = useState(false);

  const [fleetData, setFleetData] = useState({
    activeTrucks: 156,
    totalDrivers: 189,
    avgFuelConsumption: 8.5,
    targetEfficiency: 90,
  });

  // Load manager data from localStorage
  useEffect(() => {
    const data = localStorage.getItem("managerData");
    if (data) {
      setManager(JSON.parse(data));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("managerData");
    window.location.href = "/";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFleetData({ ...fleetData, [name]: value });
  };

  const handleGenerateInsights = () => {
    setShowInsights(true);
  };

  return (
    <div className="logistics-dashboard">
      {/* === Navbar === */}
      <nav className="navbar fixed-navbar">
        <div className="logo-section">
          <img
            src="/assets/HarbourMindLogo.png"
            alt="HarborMind Logo"
            className="navbar-logo"
          />
          <span className="logo-text">HarborMind</span>
        </div>

        <div className="nav-links">
          <a
            href="#fleet"
            onClick={() => setActiveTab("fleet")}
            className={activeTab === "fleet" ? "active" : ""}
          >
            <FaMapMarkedAlt className="nav-icon" /> Fleet Overview
          </a>
          <a
            href="#analytics"
            onClick={() => setActiveTab("analytics")}
            className={activeTab === "analytics" ? "active" : ""}
          >
            <FaChartBar className="nav-icon" /> Analytics
          </a>
          <a
            href="#assistant"
            onClick={() => setActiveTab("assistant")}
            className={activeTab === "assistant" ? "active" : ""}
          >
            <FaComments className="nav-icon" /> AI Assistant
          </a>
        </div>

        <div className="user">
          <div className="user-info">
            <span className="user-name">{manager.fullName || "Manager"}</span>
            <span className="user-role">{manager.position || "Manager"}</span>
          </div>
          <div className="user-icon">
            {manager.fullName
              ? manager.fullName.charAt(0).toUpperCase()
              : "M"}
          </div>
          <FiLogOut
            className="logout-icon"
            title="Logout"
            onClick={handleLogout}
          />
        </div>
      </nav>

      {/* === Dashboard Content === */}
      <div className="dashboard-content">
        <h1 className="dashboard-title">
          {manager.companyName
            ? `${manager.companyName} Fleet Dashboard`
            : "Fleet Management Dashboard"}
        </h1>
        <p className="welcome-text">
          Welcome, <span>{manager.fullName || "Manager"}</span>
        </p>

        {/* === Metrics Cards === */}
        <div className="cards-container">
          <div className="card">
            <h3>Active Trucks</h3>
            <p className="card-value">156</p>
            <p className="card-change positive">+8%</p>
          </div>
          <div className="card">
            <h3>Total Drivers</h3>
            <p className="card-value">189</p>
            <p className="card-change positive">+5%</p>
          </div>
          <div className="card">
            <h3>Avg Efficiency</h3>
            <p className="card-value">87.3%</p>
            <p className="card-change positive">+5%</p>
          </div>
          <div className="card">
            <h3>Cost Savings</h3>
            <p className="card-value">$12,450</p>
            <p className="card-change positive">+18%</p>
          </div>
        </div>

        {/* === Fleet Performance Analysis === */}
        <div className="performance-section">
          <h2 className="performance-title">
            <FaBolt className="performance-icon" /> Fleet Performance Analysis
          </h2>

          <div className="performance-grid">
            <div className="input-group">
              <label>Active Trucks</label>
              <input
                type="number"
                name="activeTrucks"
                value={fleetData.activeTrucks}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label>Total Drivers</label>
              <input
                type="number"
                name="totalDrivers"
                value={fleetData.totalDrivers}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label>Avg Fuel Consumption (L/100km)</label>
              <input
                type="number"
                name="avgFuelConsumption"
                value={fleetData.avgFuelConsumption}
                onChange={handleInputChange}
                step="0.1"
              />
            </div>
            <div className="input-group">
              <label>Target Efficiency (%)</label>
              <input
                type="number"
                name="targetEfficiency"
                value={fleetData.targetEfficiency}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <button className="generate-btn" onClick={handleGenerateInsights}>
            <FaPaperPlane className="btn-icon" /> Generate AI Insights
          </button>
        </div>

        {/* === AI Insights Section === */}
        {showInsights && (
          <div className="insights-section">
            <div className="insights-grid">
              <div className="insight-card">
                <h4>Efficiency Trend</h4>
                <p className="insight-text">
                  <FaArrowUp className="positive" /> 17% improvement this week
                </p>
              </div>

              <div className="insight-card">
                <h4>Fuel Optimization</h4>
                <p className="insight-text">
                  <FaArrowDown className="positive" /> 8% reduction through route
                  optimization
                </p>
              </div>

              <div className="insight-card">
                <h4>Carbon Footprint</h4>
                <p className="insight-text">
                  <FaArrowDown className="positive" /> 12 tons CO₂ saved this
                  month
                </p>
              </div>

              <div className="insight-card">
                <h4>Cost Savings</h4>
                <p className="insight-text">
                  <strong>$12,450</strong> in operational costs
                </p>
              </div>
            </div>

            <div className="alert-box">
              <FaExclamationTriangle className="alert-icon" />
              <span>3 drivers below efficiency threshold</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LogisticsDashboard;
