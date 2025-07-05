import React from "react";
import defaultAvatar from '../../assets/istockphoto-610003972-612x612.jpg';

export default function ProfileAvatarEdit({
  avatarUrl,
  onAvatarChange,
  onRemoveAvatar,
  handleImgError
}) {
  return (
    <div className="profile-avatar-edit">
      <img
        src={avatarUrl || defaultAvatar}
        onError={handleImgError}
        className="profile-avatar-large"
        alt="Profile Avatar"
      />
      <button
        type="button"
        className="avatar-upload-btn"
        onClick={() => document.getElementById('avatar-upload').click()}
        tabIndex={0}
      >
        Change Avatar
      </button>
      <input
        id="avatar-upload"
        type="file"
        accept="image/*"
        onChange={onAvatarChange}
        aria-label="Upload profile picture"
        style={{ display: "none" }}
      />
      {(avatarUrl && avatarUrl !== "/default-avatar.png") && (
        <button
          type="button"
          className="avatar-remove-btn"
          onClick={onRemoveAvatar}
        >
          Remove Photo
        </button>
      )}
    </div>
  );
}
