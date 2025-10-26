import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import ship from "./assets/pexels-pixabay-68737.jpg";
import logo from "./assets/HabourMind Logo.png"; 

function Home() {
  return (
    <div className="hero-container">
      {/* Left Section - Text */}
      <div className="hero-text">
        <span className="tagline">AI-Powered Logistics</span>
        <h1 className="hero-title">
          Transform Mombasa <br /> Port Operations
        </h1>
        <p className="hero-subtitle">
          HarborMind uses artificial intelligence to optimize logistics
          coordination, reduce congestion, and improve efficiency across
          Mombasa's port operations.
        </p>

        <div className="hero-buttons">
          <Link to="/get-started">
            <button className="start-trial">Start Free Trial</button>
          </Link>
          <button className="watch-demo">Watch Demo</button>
        </div>
      </div>

      {/* Right Section - Ship Image */}
      <div className="hero-image">
        <img src={ship} alt="Ship" />
      </div>
    </div>
  );
}

function SignIn() {
  return (
    <div className="page-content">
      <h2>Sign In</h2>
      <p>Welcome back! Please sign in to your account.</p>
    </div>
  );
}

function GetStarted() {
  return (
    <div className="page-content">
      <h2>Get Started</h2>
      <p>Join HarborMind and explore how AI can transform logistics efficiency.</p>
    </div>
  );
}

// === MAIN APP COMPONENT ===
function App() {
  return (
    <Router>
      <div className="app">
        {/* === NAVBAR === */}
        <nav className="navbar">
          <div className="nav-left">
            <img src={logo} alt="HarborMind Logo" className="logo" />
            <h2 className="brand">HarborMind</h2>
          </div>
          <div className="nav-right">
            <Link to="/signin">
              <button className="sign-in">Sign In</button>
            </Link>
            <Link to="/get-started">
              <button className="get-started">Get Started</button>
            </Link>
          </div>
        </nav>

        {/* === PAGE ROUTES === */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/get-started" element={<GetStarted />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
