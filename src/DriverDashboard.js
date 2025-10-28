import React, { useEffect, useState } from "react";
import "./DriverDashboard.css";
import logo from "./asessts/HabourMind Logo.png";

export default function DriverDashboard() {
  const [driverData, setDriverData] = useState({
    fullName: "",
    vehicleReg: "",
  });

  const [tripDetails, setTripDetails] = useState({
    currentLocation: "",
    destination: "",
    cargoWeight: "",
    cargoType: "",
  });

  const [aiData, setAiData] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "bot",
      text: "Good morning! I'm HarborMind, your AI logistics assistant. I can help you with route optimization, fuel efficiency, real-time alerts, and container clearance status. What would you like to know?",
    },
  ]);
  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    const storedDriver = JSON.parse(localStorage.getItem("driverData"));
    if (storedDriver) setDriverData(storedDriver);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAiData({
      departureTime: "09:30 AM",
      departureMessage: "Depart now to avoid peak congestion",
      delayProbability: "35%",
      delayMessage: "Low risk - good conditions ahead",
      fuelSavings: "15%",
      route: "Via Mombasa–Nairobi Highway (avoid Makupa Bridge)",
      warning: "Heavy congestion expected near Changamwe 8:30–9:15 AM",
    });
    setTripDetails({
      currentLocation: "",
      destination: "",
      cargoWeight: "",
      cargoType: "",
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const newMsg = { sender: "user", text: chatInput };
    setChatMessages((prev) => [
      ...prev,
      newMsg,
      { sender: "bot", text: "Processing your request..." },
    ]);
    setChatInput("");
  };

  return (
    <div
      className={`driver-dashboard ${
        activeTab === "assistant" ? "assistant-active" : ""
      }`}
    >
      {/* === NAVBAR === */}
      <nav className="top-nav">
        <div className="nav-left">
          <img src={logo} alt="HarborMind Logo" className="nav-logo" />
          <span className="logo-text">HarborMind</span>
        </div>

        <div className="nav-center">
          <button
            className={`nav-link ${
              activeTab === "dashboard" ? "active dashboard-active" : ""
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            My Trips
          </button>
          <button
            className={`nav-link ${
              activeTab === "assistant" ? "active assistant-active-link" : ""
            }`}
            onClick={() => setActiveTab("assistant")}
          >
            AI Assistant
          </button>
        </div>

        <div className="nav-right">
          <div className="profile-section">
            <span className="driver-name">
              {driverData.fullName || "Driver"}
            </span>
            <div className="avatar">
              {driverData.fullName
                ? driverData.fullName.charAt(0).toUpperCase()
                : "D"}
            </div>
          </div>
        </div>
      </nav>

      {/* === DASHBOARD BODY === */}
      {activeTab === "dashboard" && (
        <div className="dashboard-body">
          <header className="dashboard-header">
            <h1 className="dashboard-title">Driver Dashboard</h1>
            <p className="dashboard-subtitle">
              Welcome back, {driverData.fullName || "Driver"}
            </p>
          </header>

          <div className="cards-container">
            <div className="dashboard-card white-card small-card">
              <div className="card-header">
                <h3>Truck ID</h3>
                <span className="rating">⭐ 4.8</span>
              </div>
              <h2 className="card-value">{driverData.vehicleReg || "N/A"}</h2>
              <p className="card-status ready">Ready for Dispatch</p>
            </div>

            <div className="dashboard-card white-card small-card">
              <h3>Fuel Level</h3>
              <h2 className="card-value">78%</h2>
              <div className="progress-bar">
                <div className="progress fuel" style={{ width: "78%" }}></div>
              </div>
            </div>

            <div className="dashboard-card white-card small-card">
              <h3>Efficiency Score</h3>
              <h2 className="card-value">87%</h2>
              <div className="progress-bar">
                <div
                  className="progress efficiency"
                  style={{ width: "87%" }}
                ></div>
              </div>
            </div>
          </div>

          {/* === PLAN TRIP === */}
          <div className="plan-trip-card">
            <h2 className="plan-title">Plan Your Trip</h2>
            <form onSubmit={handleSubmit} className="trip-form">
              <div className="trip-row">
                <div className="trip-input">
                  <label>Current Location</label>
                  <input
                    type="text"
                    name="currentLocation"
                    value={tripDetails.currentLocation}
                    onChange={handleChange}
                    placeholder="Changamwe Port"
                    required
                  />
                </div>
                <div className="trip-input">
                  <label>Destination</label>
                  <input
                    type="text"
                    name="destination"
                    value={tripDetails.destination}
                    onChange={handleChange}
                    placeholder="Nairobi Distribution Center"
                    required
                  />
                </div>
              </div>

              <div className="trip-row">
                <div className="trip-input">
                  <label>Cargo Weight (tons)</label>
                  <input
                    type="number"
                    name="cargoWeight"
                    value={tripDetails.cargoWeight}
                    onChange={handleChange}
                    placeholder="15"
                    required
                  />
                </div>
                <div className="trip-input">
                  <label>Cargo Type</label>
                  <input
                    type="text"
                    name="cargoType"
                    value={tripDetails.cargoType}
                    onChange={handleChange}
                    placeholder="Electronics"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="recommend-btn">
                Get AI Recommendations
              </button>
            </form>
          </div>

          {aiData && (
            <div className="ai-recommendations">
              <h2 className="ai-title">AI Recommendations</h2>

              <div className="ai-cards-grid">
                <div className="ai-card">
                  <h4>Optimal Departure Time</h4>
                  <h2>{aiData.departureTime}</h2>
                  <p>{aiData.departureMessage}</p>
                </div>

                <div className="ai-card">
                  <h4>Delay Probability</h4>
                  <h2 className="orange">{aiData.delayProbability}</h2>
                  <p>{aiData.delayMessage}</p>
                </div>

                <div className="ai-card">
                  <h4>Estimated Fuel Savings</h4>
                  <h2 className="green">{aiData.fuelSavings}</h2>
                  <p>By following recommended route</p>
                </div>

                <div className="ai-card">
                  <h4>Recommended Route</h4>
                  <h3>
                    <strong>{aiData.route}</strong>
                  </h3>
                </div>
              </div>

              <div className="ai-warning">
                <span>{aiData.warning}</span>
              </div>

              <div className="ai-buttons">
                <button className="btn-disabled">Accept Route</button>
                <button className="btn-primary">View Alternatives</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* === AI ASSISTANT === */}
      {activeTab === "assistant" && (
        <div className="ai-assistant-container">
          <div className="ai-header">
            <h1> AI Assistant</h1>
            <p>Get real-time insights and route optimization</p>
          </div>

          <div className="ai-chat-window">
            <div className="ai-buttons">
              <button> Optimize Route</button>
              <button> Fuel Efficiency</button>
              <button> Check Delays</button>
              <button> Efficiency Report</button>
            </div>

            <div className="ai-chat-messages">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`ai-message ${
                    msg.sender === "user" ? "user" : "bot"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <form className="ai-input-area" onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder="Ask for route optimization, delays, or efficiency tips..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
