import React from "react";
import ProfileAvatarEdit from "./ProfileAvatarEdit";

export default function ProfileForm({
  name, setName,
  phone, setPhone,
  email,
  avatarUrl, onAvatarChange, onRemoveAvatar, handleImgError,
  isUnchanged, isSaving, handleSubmit
}) {
  return (
    <form className="profile-edit-form" onSubmit={handleSubmit}>
      <ProfileAvatarEdit
        avatarUrl={avatarUrl}
        onAvatarChange={onAvatarChange}
        onRemoveAvatar={onRemoveAvatar}
        handleImgError={handleImgError}
      />

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
          value={email}
          readOnly
          disabled
          aria-label="Email address (read-only)"
        />
      </label>
      <button type="submit" disabled={isUnchanged || isSaving}>
        {isSaving ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
