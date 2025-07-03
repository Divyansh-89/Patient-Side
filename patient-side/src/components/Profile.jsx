import React, { useState } from "react";
import "./Profile.css";
import { toast } from 'react-toastify';

const MAX_FILE_SIZE_MB = 5;

export default function ProfilePage({ user, onUpdateProfile }) {
    const [name, setName] = useState(user.name || "");
    const [phone, setPhone] = useState(user.phone || "");
    const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || "");
    const [avatarFile, setAvatarFile] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                toast.error("File size should be under 5MB.");
                return;
            }
            if (avatarUrl && avatarUrl !== user.avatarUrl) {
                URL.revokeObjectURL(avatarUrl);
            }
            setAvatarFile(file);
            setAvatarUrl(URL.createObjectURL(file));
        }
    };

    const handleImgError = (e) => {
        e.target.src = "patient-side\src\components\jiro.jpeg";
    };

    const isUnchanged = (
        name === user.name &&
        phone === user.phone &&
        avatarFile === null
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const updatedProfile = {
                name,
                phone,
                avatarUrl: avatarFile ? avatarUrl : user.avatarUrl,
            };
            await onUpdateProfile(updatedProfile); 
            toast.success("Profile updated!");
        } catch (err) {
            toast.error("Failed to update profile");
        } finally {
            setIsSaving(false);
        }
    };

    const handleRemoveAvatar = () => {
        if (avatarUrl && avatarUrl !== user.avatarUrl) {
            URL.revokeObjectURL(avatarUrl);
        }
        setAvatarUrl("");
        setAvatarFile(null);
    };

    return (
        <div className="profile-edit-center">
            <div className="profile-edit-container">
                <h2>Edit Profile</h2>
                <form className="profile-edit-form" onSubmit={handleSubmit}>
                    <div className="profile-avatar-edit">
                        <img
                            src={avatarUrl}
                            onError={handleImgError}
                            className="profile-avatar-large"
                        />
                        <label htmlFor="avatar-upload" className="avatar-upload-label">
                            Change Avatar
                        </label>
                        <input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            aria-label="Upload profile picture"
                            style={{ display: "none" }}
                        />
                        {(avatarUrl && avatarUrl !== "/default-avatar.png") && (
                            <button
                                type="button"
                                onClick={handleRemoveAvatar}
                            >
                                Remove Photo
                            </button>
                        )}
                    </div>
                    <label htmlFor="name">
                        Name
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            aria-required="true"
                        />
                    </label>
                    <label htmlFor="phone">
                        Phone Number
                        <input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter your phone number"
                            pattern="[0-9]{10,15}"
                            title="Please enter a valid phone number"
                        />
                    </label>
                    <label htmlFor="email">
                        Email
                        <input
                            id="email"
                            type="email"
                            value={user.email}
                            readOnly
                            disabled
                            aria-label="Email address (read-only)"
                        />
                    </label>
                    <button type="submit" disabled={isUnchanged || isSaving}>
                        {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
}
