import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./DriverDashboard.css";
import logo from "./asessts/HabourMind Logo.png";
import { generateTripRecommendations, geminiChat } from "./geminiService";
import { useSpeechRecognition } from "./hooks/useSpeechRecognition";
import { useTextToSpeech } from "./hooks/useTextToSpeech";
import { 
  FaTruck, 
  FaGasPump, 
  FaChartLine, 
  FaMapMarkerAlt, 
  FaRoute,
  FaRobot,
  FaClock,
  FaExclamationTriangle,
  FaTrash,
  FaPaperPlane,
  FaMicrophone,
  FaStop,
  FaVolumeUp
} from "react-icons/fa";

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
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const [recommendationError, setRecommendationError] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "bot",
      text: "### Welcome to HarborMind AI! 🚛\n\nHello! I'm **HarborMind AI**, your intelligent logistics assistant. I'm here to help you with:\n\n* **Route optimization** and traffic analysis\n* **Weather conditions** and safety assessments  \n* **Fuel efficiency** recommendations\n* **Port logistics** and clearance guidance\n* **Real-time insights** for Kenyan transportation\n\nI specialize in **Mombasa Port operations** and transportation throughout Kenya. How can I assist you today?",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isVoiceInput, setIsVoiceInput] = useState(false);
  
  // Voice recognition and TTS hooks
  const { 
    isListening, 
    transcript, 
    startListening, 
    stopListening, 
    resetTranscript,
    isSupported: speechSupported 
  } = useSpeechRecognition();
  
  const { 
    speak, 
    stop: stopSpeaking, 
    isSpeaking,
    isSupported: ttsSupported 
  } = useTextToSpeech();

  useEffect(() => {
    const storedDriver = JSON.parse(localStorage.getItem("driverData"));
    if (storedDriver) setDriverData(storedDriver);
  }, []);

  // Handle voice transcript when recording completes
  useEffect(() => {
    if (transcript && !isListening) {
      setChatInput(transcript);
      setIsVoiceInput(true);
    }
  }, [transcript, isListening]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingRecommendations(true);
    setRecommendationError(null);
    
    try {
      const recommendations = await generateTripRecommendations(tripDetails);
      
      // Parse the AI response and extract key information
      // For now, we'll display the full response and extract some mock data
      setAiData({
        fullRecommendation: recommendations,
        departureTime: "09:30 AM", // This would be extracted from AI response
        departureMessage: "Optimal time based on traffic analysis",
        delayProbability: "25%",
        delayMessage: "Low risk - favorable conditions",
        fuelSavings: "18%",
        route: "AI-optimized route via A109 Highway",
        warning: "Monitor weather conditions near Voi",
      });
      
      // Clear the form
      setTripDetails({
        currentLocation: "",
        destination: "",
        cargoWeight: "",
        cargoType: "",
      });
    } catch (error) {
      setRecommendationError(error.message);
      console.error('Error getting recommendations:', error);
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;
    
    const userMessage = chatInput;
    const wasVoiceInput = isVoiceInput;
    
    const newMsg = { 
      sender: "user", 
      text: userMessage,
      isVoiceInitiated: wasVoiceInput
    };
    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput("");
    setIsChatLoading(true);
    
    // Reset voice input and transcript for next message
    if (wasVoiceInput) {
      resetTranscript();
      setIsVoiceInput(false);
    }

    try {
      const response = await geminiChat.sendMessage(userMessage);
      const botReply = {
        sender: "bot",
        text: response,
        isVoiceInitiated: wasVoiceInput
      };
      setChatMessages((prev) => [...prev, botReply]);
    } catch (error) {
      const errorReply = {
        sender: "bot",
        text: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
        isVoiceInitiated: false
      };
      setChatMessages((prev) => [...prev, errorReply]);
      console.error('Chat error:', error);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleClearChat = () => {
    geminiChat.clearChat();
    setChatMessages([
      {
        sender: "bot",
        text: "### Welcome to HarborMind AI! 🚛\n\nHello! I'm **HarborMind AI**, your intelligent logistics assistant. I'm here to help you with:\n\n* **Route optimization** and traffic analysis\n* **Weather conditions** and safety assessments  \n* **Fuel efficiency** recommendations\n* **Port logistics** and clearance guidance\n* **Real-time insights** for Kenyan transportation\n\nI specialize in **Mombasa Port operations** and transportation throughout Kenya. How can I assist you today?",
        isVoiceInitiated: false
      },
    ]);
    // Reset voice states
    resetTranscript();
    setIsVoiceInput(false);
    if (isListening) {
      stopListening();
    }
    if (isSpeaking) {
      stopSpeaking();
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
      setChatInput(""); // Clear any manual input when starting voice
    }
  };

  const handleManualInput = (e) => {
    setChatInput(e.target.value);
    setIsVoiceInput(false); // Mark as manual input
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
                <div className="card-title-section">
                  <FaTruck className="card-icon" />
                  <h3>Truck ID</h3>
                </div>
                <span className="rating">⭐ 4.8</span>
              </div>
              <h2 className="card-value">{driverData.vehicleReg || "N/A"}</h2>
              <p className="card-status ready">
                <span className="status-dot ready"></span>
                Ready for Dispatch
              </p>
            </div>

            <div className="dashboard-card white-card small-card">
              <div className="card-header">
                <div className="card-title-section">
                  <FaGasPump className="card-icon fuel-icon" />
                  <h3>Fuel Level</h3>
                </div>
              </div>
              <h2 className="card-value">78%</h2>
              <div className="progress-bar">
                <div className="progress fuel" style={{ width: "78%" }}></div>
              </div>
              <p className="card-status">Good level</p>
            </div>

            <div className="dashboard-card white-card small-card">
              <div className="card-header">
                <div className="card-title-section">
                  <FaChartLine className="card-icon efficiency-icon" />
                  <h3>Efficiency Score</h3>
                </div>
              </div>
              <h2 className="card-value">87%</h2>
              <div className="progress-bar">
                <div
                  className="progress efficiency"
                  style={{ width: "87%" }}
                ></div>
              </div>
              <p className="card-status excellent">Excellent performance</p>
            </div>
          </div>

          {/* === PLAN TRIP === */}
          <div className="plan-trip-card">
            <h2 className="plan-title">
              <FaRoute className="section-icon" />
              Plan Your Trip
            </h2>
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

              <button type="submit" className="recommend-btn" disabled={isLoadingRecommendations}>
                {isLoadingRecommendations ? (
                  <>
                    <span className="loading-spinner"></span>
                    Analyzing Route...
                  </>
                ) : (
                  'Get AI Recommendations'
                )}
              </button>
              
              {recommendationError && (
                <div className="error-message">
                  <FaExclamationTriangle />
                  {recommendationError}
                </div>
              )}
            </form>
          </div>

          {aiData && (
            <div className="ai-recommendations">
              <h2 className="ai-title">
                <FaRobot className="section-icon" />
                AI Recommendations
              </h2>

              <div className="ai-cards-grid">
                <div className="ai-card">
                  <div className="ai-card-header">
                    <FaClock className="ai-card-icon" />
                    <h4>Optimal Departure Time</h4>
                  </div>
                  <h2>{aiData.departureTime}</h2>
                  <p>{aiData.departureMessage}</p>
                </div>

                <div className="ai-card">
                  <div className="ai-card-header">
                    <FaExclamationTriangle className="ai-card-icon warning" />
                    <h4>Delay Probability</h4>
                  </div>
                  <h2 className="orange">{aiData.delayProbability}</h2>
                  <p>{aiData.delayMessage}</p>
                </div>

                <div className="ai-card">
                  <div className="ai-card-header">
                    <FaGasPump className="ai-card-icon success" />
                    <h4>Estimated Fuel Savings</h4>
                  </div>
                  <h2 className="green">{aiData.fuelSavings}</h2>
                  <p>By following recommended route</p>
                </div>

                <div className="ai-card">
                  <div className="ai-card-header">
                    <FaMapMarkerAlt className="ai-card-icon" />
                    <h4>Recommended Route</h4>
                  </div>
                  <h3>
                    <strong>{aiData.route}</strong>
                  </h3>
                </div>
              </div>

              <div className="ai-warning">
                <span>{aiData.warning}</span>
              </div>

              {aiData.fullRecommendation && (
                <div className="full-recommendation">
                  <div className="recommendation-text">
                    <ReactMarkdown>{aiData.fullRecommendation}</ReactMarkdown>
                  </div>
                </div>
              )}

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
            <div className="ai-header-content">
              <div>
                <h1>AI Assistant</h1>
                <p>Get real-time insights and route optimization</p>
              </div>
              <button className="clear-chat-btn" onClick={handleClearChat} title="Clear Chat">
                <FaTrash />
                Clear Chat
              </button>
            </div>
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
                  <div className="message-content">
                    {msg.sender === "bot" ? (
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    ) : (
                      msg.text
                    )}
                  </div>
                  {msg.sender === "bot" && msg.isVoiceInitiated && ttsSupported && (
                    <button
                      className={`tts-button ${isSpeaking ? 'speaking' : ''}`}
                      onClick={() => speak(msg.text, 'sw-KE')}
                      disabled={isSpeaking}
                      title="Listen to response in Swahili"
                    >
                      <FaVolumeUp />
                    </button>
                  )}
                </div>
              ))}
              {isChatLoading && (
                <div className="ai-message bot loading">
                  <span className="loading-dots"></span>
                  HarborMind AI is thinking...
                </div>
              )}
            </div>

            <form className="ai-input-area" onSubmit={handleSendMessage}>
              {speechSupported && (
                <button 
                  type="button" 
                  className={`mic-button ${isListening ? 'listening' : ''}`}
                  onClick={handleMicClick}
                  disabled={isChatLoading}
                  title={isListening ? "Stop recording" : "Start voice input (Swahili)"}
                >
                  {isListening ? <FaStop /> : <FaMicrophone />}
                </button>
              )}
              <input
                type="text"
                placeholder={isListening ? "Listening in Swahili..." : "Ask for route optimization, delays, or efficiency tips..."}
                value={chatInput}
                onChange={handleManualInput}
                disabled={isChatLoading || isListening}
              />
              <button type="submit" disabled={isChatLoading || !chatInput.trim()}>
                {isChatLoading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <FaPaperPlane />
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
