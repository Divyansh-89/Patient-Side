import React, { useState } from "react";

// Component imports
import Navbar from "./components/Navbar";
import ProfilePage from "./components/Profile";

// Page imports
import AppointmentsPage from "./pages/AppointmentsPage";
import DashboardPage from "./pages/DashboardPage";
import MedicalHistoryPage from "./pages/MedicalHistoryPage";
import ReportsPage from "./pages/ReportsPage";

// Styles
import './App.css';

/**
 * Main App component - handles routing and user state management
 * @returns {JSX.Element} The main application component
 */
function App() {
  // Navigation state - tracks which page is currently active
  const [currentPage, setCurrentPage] = useState("dashboard");

  // User profile state - stores user information
  const [user, setUser] = useState({
    name: "Jane Doe",
    email: "janedoe@gmail.com",
    avatarUrl: "",
    phone: ""
  });

  /**
   * Handles profile updates by merging new data with existing user data
   * @param {Object} updated - Object containing updated user fields
   */
  function handleUpdateProfile(updated) {
    setUser({ ...user, ...updated });
  }

  /**
   * Renders the appropriate page component based on current navigation state
   * @returns {JSX.Element} The page component to display
   */
  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardPage />;
      case "appointments":
        return <AppointmentsPage />;
      case "medicalHistory":
        return <MedicalHistoryPage />;
      case "reports":
        return <ReportsPage />;
      case "profile":
        return (
          <ProfilePage
            user={user}
            onUpdateProfile={handleUpdateProfile}
          />
        );
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="App-root">
      {/* Navigation bar with current page tracking */}
      <Navbar
        currentPage={currentPage}
        onNavClick={setCurrentPage}
      />

      {/* Main content area - displays selected page */}
      <div className="main-content">
        {renderCurrentPage()}
      </div>
    </div>
  );
}

export default App;