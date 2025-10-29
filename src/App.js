import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaBolt,
  FaChartBar,
  FaRobot,
  FaTachometerAlt,
  FaLeaf,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "./index.css";
import ship from "./asessts/pexels-pixabay-68737.jpg";
import logo from "./asessts/HabourMind Logo.png";
import GetStartedPage from "./GetStartedPage";
import TruckDriverPage from "./TruckDriverPage";
import DriverDashboard from "./DriverDashboard";
import LogisticsManagerRegistration from "./LogisticsManagerRegistration";
import LogisticsDashboard from "./LogisticsDashboard";
import PortAuthorityPage from "./PortAuthorityPage";
import PortAuthorityDashboard from "./PortAuthorityDashboard";



function Counter({ target, duration, suffix = "" }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return (
    <span>
      {target >= 1 ? count.toFixed(0) : count.toFixed(1)}
      {suffix}
    </span>
  );
}

function StatsSection() {
  return (
    <section className="stats-section">
      <div className="stat-box">
        <h2><Counter target={40} duration={2000} suffix="%" /></h2>
        <p>Reduction in idle time</p>
      </div>
      <div className="stat-box">
        <h2><Counter target={25} duration={2000} suffix="%" /></h2>
        <p>Fuel savings</p>
      </div>
      <div className="stat-box">
        <h2><Counter target={3.2} duration={2000} suffix="T" /></h2>
        <p>CO₂ reduction per month</p>
      </div>
      <div className="stat-box">
        <h2><Counter target={87} duration={2000} suffix="%" /></h2>
        <p>Average efficiency</p>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: <FaMapMarkerAlt />,
      title: "Real-Time Tracking",
      desc: "Monitor all trucks and cargo in real-time with live GPS tracking and status updates.",
    },
    {
      icon: <FaBolt />,
      title: "AI Route Optimization",
      desc: "Get intelligent route suggestions that reduce fuel consumption and delivery times.",
    },
    {
      icon: <FaChartBar />,
      title: "Advanced Analytics",
      desc: "Comprehensive dashboards with actionable insights for fleet managers.",
    },
    {
      icon: <FaRobot />,
      title: "AI Assistant",
      desc: "24/7 intelligent chatbot for drivers and logistics coordinators.",
    },
    {
      icon: <FaTachometerAlt />,
      title: "Performance Metrics",
      desc: "Track efficiency, fuel savings, and environmental impact in real-time.",
    },
    {
      icon: <FaLeaf />,
      title: "Eco-Friendly",
      desc: "Reduce carbon footprint with optimized routes and better coordination.",
    },
  ];

  return (
    <section className="features-section">
      <h2 className="section-title">Powerful Features</h2>
      <p className="section-subtitle">
        Everything you need to optimize logistics operations and improve efficiency
      </p>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>

      <div className="cta-section">
        <h2>Ready to Transform Your Operations?</h2>
        <p>
          Join logistics managers, truck drivers, and port authorities using HarborMind
          to optimize operations.
        </p>
        <Link to="/get-started">
          <button className="cta-button">
            Get Started Free <span className="arrow">→</span>
          </button>
        </Link>
      </div>

      {/* === FOOTER SECTION === */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-col">
            <h3>HarborMind</h3>
            <p>Intelligent logistics coordination for Mombasa port operations.</p>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/">Analytics</Link></li>
              <li><Link to="/">AI Assistant</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><Link to="/">Help Center</Link></li>
              <li><Link to="/">Contact Us</Link></li>
              <li><Link to="/">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <hr className="footer-divider" />
        <div className="footer-bottom">
          <p>© 2025 HarborMind. All rights reserved.</p>
        </div>
      </footer>
    </section>
  );
}

function Home() {
  return (
    <>
      <div className="hero-container">
        <div className="hero-text">
          <span className="tagline">AI-Powered Logistics</span>
          <h1 className="hero-title">Transform Mombasa <br /> Port Operations</h1>
          <p className="hero-subtitle">
            HarborMind uses artificial intelligence to optimize logistics coordination,
            reduce congestion, and improve efficiency across Mombasa's port operations.
          </p>
          <div className="hero-buttons">
            <Link to="/get-started"><button className="start-trial">Start Free Trial</button></Link>
            <button className="watch-demo">Watch Demo</button>
          </div>
        </div>
        <div className="hero-image">
          <img src={ship} alt="Ship" />
        </div>
      </div>
      <StatsSection />
      <FeaturesSection />
    </>
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

function LayoutWithNavbar() {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/dashboard/driver" ||
    location.pathname === "/portauthority-dashboard" ||
    location.pathname === "/logistics-dashboard";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="app">
      {!hideNavbar && (
        <nav className="navbar fixed-nav">
          <div className="nav-left">
            <img src={logo} alt="HarborMind Logo" className="logo" />
            <h2 className="brand">HarborMind</h2>
          </div>
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <div className={`nav-right ${mobileMenuOpen ? '' : 'mobile-hidden'}`}>
            <Link to="/signin" onClick={() => setMobileMenuOpen(false)}>
              <button className="sign-in">Sign In</button>
            </Link>
            <Link to="/get-started" onClick={() => setMobileMenuOpen(false)}>
              <button className="get-started">Get Started</button>
            </Link>
          </div>
        </nav>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/get-started" element={<GetStartedPage />} />
        <Route path="/truck-driver" element={<TruckDriverPage />} />
        <Route path="/dashboard/driver" element={<DriverDashboard />} />
        <Route path="/logistics-manager" element={<LogisticsManagerRegistration />} />
        <Route path="/logistics-dashboard" element={<LogisticsDashboard />} />
        <Route path="/port-authority" element={<PortAuthorityPage />} />
        <Route path="/portauthority-dashboard" element={<PortAuthorityDashboard />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <LayoutWithNavbar />
    </Router>
  );
}

export default App;
