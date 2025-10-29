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
  FaUsers,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import "./LogisticsDashboard.css";

// ✅ Recharts imports
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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

  // Sample analytics data
  const analyticsData = [
    { month: "Jan", efficiency: 75, fuel: 120 },
    { month: "Feb", efficiency: 82, fuel: 115 },
    { month: "Mar", efficiency: 88, fuel: 108 },
    { month: "Apr", efficiency: 85, fuel: 112 },
    { month: "May", efficiency: 90, fuel: 105 },
    { month: "Jun", efficiency: 92, fuel: 102 },
  ];

  const driverPerformance = [
    { name: "Driver A", trips: 120, rating: 4.8 },
    { name: "Driver B", trips: 98, rating: 4.5 },
    { name: "Driver C", trips: 87, rating: 4.1 },
    { name: "Driver D", trips: 110, rating: 4.9 },
  ];

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
          <a
            href="#community"
            onClick={() => setActiveTab("community")}
            className={activeTab === "community" ? "active" : ""}
          >
            <FaUsers className="nav-icon" /> Community
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

        {/* === Fleet Overview === */}
        {activeTab === "fleet" && (
          <>
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
                      <FaArrowDown className="positive" /> 8% reduction through
                      route optimization
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
          </>
        )}

        {/* === Analytics Section === */}
        {activeTab === "analytics" && (
          <div className="analytics-section">
            <h2 className="analytics-title">
              <FaChartBar className="analytics-icon" /> Fleet Analytics
            </h2>

            <div className="charts-container">
              <div className="chart-card">
                <h3>Fleet Efficiency (Monthly)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                    <XAxis dataKey="month" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="efficiency"
                      stroke="#1e3a8a"
                      strokeWidth={3}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-card">
                <h3>Fuel Usage Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                    <XAxis dataKey="month" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="fuel" fill="#0077b6" barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-card">
                <h3>Driver Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={driverPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                    <XAxis dataKey="name" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="trips" fill="#1e40af" barSize={40} />
                    <Bar dataKey="rating" fill="#38bdf8" barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LogisticsDashboard;
