import React, { useState } from "react";
import { toast } from 'react-toastify';
import ProfileForm from "./ProfileForm";
import LogoutButton from './LogoutButton';
import './Profile.css'; 

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
    e.target.src = "/patient-side/src/components/jiro.jpeg"; 
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
      console.error("Error updating profile:", err);
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
        <ProfileForm
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
          email={user.email}
          avatarUrl={avatarUrl}
          onAvatarChange={handleAvatarChange}
          onRemoveAvatar={handleRemoveAvatar}
          handleImgError={handleImgError}
          isUnchanged={isUnchanged}
          isSaving={isSaving}
          handleSubmit={handleSubmit}
        />
        <div className="logout-button-container">
          <LogoutButton className="profile-logout-btn" />
        </div>
      </div>
    </div>
  );
}