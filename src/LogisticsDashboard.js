import React from "react";
import "./LogisticsDashboard.css";

function LogisticsDashboard() {
  return (
    <div className="logistics-dashboard">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">HarborMind</div>

        <div className="nav-links">
          <a href="#fleet">Fleet Overview</a>
          <a href="#analytics">Analytics</a>
          <a href="#assistant">AI Assistant</a>
        </div>

        <div className="user">
          <span className="user-name">Christal Riziki</span>
          <div className="user-role">Manager</div>
          <div className="user-icon">C</div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        <h1 className="dashboard-title">Fleet Management Dashboard</h1>
        <p className="welcome-text">Welcome, Christal Riziki</p>

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
      </div>
    </div>
  );
}

export default LogisticsDashboard;
