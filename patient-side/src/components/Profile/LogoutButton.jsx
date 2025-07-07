// LogoutButton.jsx
import React from 'react';

export default function LogoutButton({ className }) { 
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = 'https://www.youtube.com/watch?v=xvFZjo5PgG0';
  };

  return (
    <button onClick={handleLogout} className={className}>
      Logout
    </button>
  );
}