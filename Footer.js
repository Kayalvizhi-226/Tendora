// src/components/Footer.js
import React from "react";
import "./Footer.css";

const Footer = () => {
  // Function to scroll to the top of the page smoothly
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      {/* Back to Top Section */}
      <div className="footer-top">
        <a href="#top" className="back-to-top" onClick={scrollToTop}>
          Back to top
        </a>
      </div>

      {/* Footer Links Section */}
      <div className="footer-links">
        <div className="footer-column">
          <h3>Get to Know Us</h3>
          <ul>
            <li><a href="/">About Tendora</a></li>
            <li><a href="/">Careers</a></li>
            <li><a href="/">Press Releases</a></li>
            <li><a href="/">Tendora Science</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Connect with Us</h3>
          <ul>
            <li><a href="/">Facebook</a></li>
            <li><a href="/">Twitter</a></li>
            <li><a href="/">Instagram</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Make Money with Us</h3>
          <ul>
            <li><a href="/">Sell on Tendora</a></li>
            <li><a href="/">Become an Affiliate</a></li>
            <li><a href="/">Advertise Your Products</a></li>
            <li><a href="/">Tendora Pay for Merchants</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Let Us Help You</h3>
          <ul>
            <li><a href="/">Your Account</a></li>
            <li><a href="/">Returns Centre</a></li>
            <li><a href="/">100% Purchase Protection</a></li>
            <li><a href="/">Help</a></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom">
        <div className="footer-logo">
          <h2>Tendora</h2>
        </div>
        <div className="footer-language">
          <button className="language-btn">
            🌐 English <span className="language">🇮🇳 India</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
