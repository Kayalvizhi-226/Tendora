// src/pages/ProfilePage.js
import React, { useState, useEffect } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  // State to hold profile data
  const [profile, setProfile] = useState(null);
  // State to toggle between view and edit modes
  const [editMode, setEditMode] = useState(false);
  // State to hold form data while editing
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  // State to handle loading and errors
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);

  // Simulate an API call to fetch profile data
  useEffect(() => {
    // Here you can replace with an actual API call
    setTimeout(() => {
      const dummyProfile = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        phone: '555-1234',
        address: '123 Main Street, Anytown, USA',
      };
      setProfile(dummyProfile);
      setFormData(dummyProfile);
      setLoading(false);
    }, 1000);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // In a real app, you would send the updated profile to your API
    setProfile(formData);
    setEditMode(false);
  };

  if (loading) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  if (error) {
    return <div className="profile-error">Error loading profile.</div>;
  }

  return (
    <div className="profile-page">
      <h1>My Profile</h1>
      {editMode ? (
        <form onSubmit={handleSave} className="profile-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="profile-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditMode(false)}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-info">
          <p>
            <strong>Name:</strong> {profile.name}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Phone:</strong> {profile.phone}
          </p>
          <p>
            <strong>Address:</strong> {profile.address}
          </p>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
