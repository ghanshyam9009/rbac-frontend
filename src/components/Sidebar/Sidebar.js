import React from 'react';
import './Sidebar.css';
import logoImage from '../../assets/VRNsecurityy.jpg'; // Update the path to your logo image

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src={logoImage} alt="VRV Security Logo" className="logo" />
      </div>
      <div className="company-info">
        <h3>VRV Security</h3>
        <p>
          Founded in 2020, VRV Security is a global leader in AI-powered cybersecurity. We protect digital assets for Fortune 500 companies and government entities, securing over 1 million endpoints worldwide.
        </p>
        <h4>Our Services</h4>
        <ul>
          <li>AI-Driven VAPT</li>
          <li>Cloud Infrastructure Security</li>
          <li>24/7 Threat Monitoring & SOC</li>
          <li>Enterprise Infrastructure Protection</li>
        </ul>
      </div>
      <ul>
        <li className="sidebar-item">Logout</li>
        <li className="sidebar-item">Help & Support</li>
      </ul>
    </div>
  );
};

export default Sidebar;
