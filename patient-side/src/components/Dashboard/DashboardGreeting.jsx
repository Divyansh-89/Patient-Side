import React from "react";
import defaultAvatar from '../../assets/istockphoto-610003972-612x612.jpg';

export default function DashboardGreeting({ user, avatar, quote }) {
  return (
    <div className="welcome-section-content">
      <img src={avatar} alt="User Avatar" className="welcome-avatar" />
      <div className="welcome-text-and-quote">
        <h1 className="gradient-heading">
          Hello {user.name}, Welcome Back!
        </h1>
        <p className="welcome-tagline-replaced-by-quote">{quote}</p>
      </div>
    </div >
  );
}
