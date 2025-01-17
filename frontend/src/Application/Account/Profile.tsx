import React, { useEffect, useState } from "react";
import { fetchProfile, updateProfile, deleteProfile } from "./client"; // Adjust the path
import { useNavigate } from "react-router-dom";
import "../CssFolder/Profile.css";
import { useSelector } from "react-redux";

export default function Profile() {
  const [profile, setProfile] = useState({
    email: "",
    name: "",
    phoneNumber: "",
    dob: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const currentUser = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchProfile(currentUser.email);
        setProfile(data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError("Failed to load profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedProfile = await updateProfile(profile);
      setProfile(updatedProfile);
      setSuccessMessage("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError("Failed to update profile. Please try again later.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }
    try {
      await deleteProfile();
      alert("Your account has been deleted.");
      navigate("/Application/Landing"); // Redirect to landing page after deletion
    } catch (err) {
      console.error("Failed to delete profile:", err);
      setError("Failed to delete account. Please try again later.");
    }
  };

  if (loading) return <p>Loading your profile...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="profile-container">
      <h1>Your Profile</h1>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={profile.email} disabled />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            value={profile.phoneNumber}
            onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            value={profile.dob}
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          />
        </div>
        <button type="submit" className="update-button">
          Update Profile
        </button>
      </form>
      <button onClick={handleDelete} className="delete-button">
        Delete Account
      </button>
    </div>
  );
}
