import React, { useState } from "react";
import "./Profile.css";

/**
 * ProfilePage Component - User profile editing interface
 * Allows users to update their profile information including avatar, name, and phone
 * 
 * @param {Object} props - Component props
 * @param {Object} props.user - Current user data object
 * @param {string} props.user.name - User's display name
 * @param {string} props.user.email - User's email address (read-only)
 * @param {string} props.user.phone - User's phone number
 * @param {string} props.user.avatarUrl - URL to user's avatar image
 * @param {Function} props.onUpdateProfile - Callback function to update user profile
 * @returns {JSX.Element} The profile editing form component
 */
export default function ProfilePage({ user, onUpdateProfile }) {
    // ==========================================================================
    // State Management - Form field states
    // ==========================================================================

    /** @type {string} User's display name */
    const [name, setName] = useState(user.name || "");

    /** @type {string} User's phone number */
    const [phone, setPhone] = useState(user.phone || "");

    /** @type {string} URL for user's avatar image */
    const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || "");

    /** @type {File|null} Selected avatar file for upload */
    const [avatarFile, setAvatarFile] = useState(null);

    // ==========================================================================
    // Event Handlers - Form interaction functions
    // ==========================================================================

    /**
     * Handles avatar image file selection and preview
     * Creates a local URL for immediate preview of selected image
     * 
     * @param {Event} e - File input change event
     */
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setAvatarFile(file);
            setAvatarUrl(URL.createObjectURL(file));
        }
    };

    /**
     * Handles form submission and profile update
     * Prevents default form submission and calls parent update function
     * 
     * @param {Event} e - Form submission event
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare updated profile data
        const updatedProfile = {
            name,
            phone,
            avatarUrl: avatarFile ? avatarUrl : user.avatarUrl,
            // Note: email remains unchanged as it's read-only
        };

        // Call parent component's update function
        onUpdateProfile(updatedProfile);

        // Provide user feedback
        alert("Profile updated!");
    };

    // ==========================================================================
    // Component Render - JSX structure
    // ==========================================================================

    return (
        <div className="profile-edit-center">
            <div className="profile-edit-container">
                {/* Page Header */}
                <h2>Edit Profile</h2>

                {/* Profile Edit Form */}
                <form className="profile-edit-form" onSubmit={handleSubmit}>

                    {/* Avatar Upload Section */}
                    <div className="profile-avatar-edit">
                        <img
                            src={avatarUrl}
                            className="profile-avatar-large"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            aria-label="Upload profile picture"
                        />
                    </div>

                    {/* Name Input Field */}
                    <label>
                        Name
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            aria-required="true"
                        />
                    </label>

                    {/* Phone Input Field */}
                    <label>
                        Phone Number
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter your phone number"
                        />
                    </label>

                    {/* Email Input Field (Read-only) */}
                    <label>
                        Email
                        <input
                            type="email"
                            value={user.email}
                            readOnly
                            disabled
                            aria-label="Email address (read-only)"
                        />
                    </label>

                    {/* Submit Button */}
                    <button type="submit">
                        Save Changes
                    </button>

                </form>
            </div>
        </div>
    );
}