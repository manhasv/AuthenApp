import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import { FaUserCircle } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import "../../CssFolder/PeopleDetails.css";
import * as client from "../../Account/client";

export default function PeopleDetails({ 
  onSave,
}: { 
  onSave: (id: string, user: any) => void,
}) {
  const { uid } = useParams();
  const [user, setUser] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUser = async () => {
    setLoading(true);
    try {
      const fetchedUser = uid
        ? await client.fetchUserWithID(uid) // Replace with your API client
        : {
          data: {
            _id: "1",
            firstName: "John",
            lastName: "Doe",
            role: "Admin",
            loginId: "johndoe",
            section: "Management",
            totalActivity: 123,
            email: "john.doe@example.com",
            lastLogin: "2023-12-01",
            isVerified: true,
          },
        }; // Mocked user data
      setUser(fetchedUser.data);
      setUpdatedUser(fetchedUser.data); // Initialize updated user with fetched data
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveUser = async () => {
    try {
      onSave(uid ?? '', updatedUser);
      setUser(updatedUser);
      setEditing(false);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleChange = (field: string, value: string) => {
    setUpdatedUser((prev: any) => ({
      ...prev,
      [field]: field === "isVerified" ? value === "Verified" : value,
    }));
  };

  const handleVerify = () => {
    try {
      setUser((prev: any) => ({ ...prev, isVerified: true }));
    } catch (error) {
      console.error("Error verifying user:", error);
    }
  }

  useEffect(() => {
    fetchUser();

  }, [uid]);

  if (!uid) return <div></div>;
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Failed to load user details.</div>;

  return (
    <div className="details-panel">
      <button className="close-button" onClick={() => navigate("/Application/Admin/Users")}>
        <IoCloseSharp />
      </button>
      <div className="header">
        <FaUserCircle className="user-icon" />
        <div className="name">
          {editing ? (
            <input
              type="text"
              className="name-input"
              value={updatedUser.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          ) : (
            <span>{user.name}</span>
          )}
          <FaPencil className="edit-icon" onClick={() => setEditing(!editing)} />
        </div>
      </div>
      <table className="details-table">
        <tbody>
          <tr>
            <td>Role:</td>
            <td>
              {editing ? (
                <select
                  value={updatedUser.role || ""}
                  onChange={(e) => handleChange("role", e.target.value)}
                >
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                  <option value="Viewer">Viewer</option>
                </select>
              ) : (
                user.role || "N/A"
              )}
            </td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>
              {editing ? (
                <input
                  type="email"
                  value={updatedUser.email || ""}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              ) : (
                user.email || "N/A"
              )}
            </td>
          </tr>
          <tr>
            <td>Last Login:</td>
            <td>{user.lastLogin || "N/A"}</td>
          </tr>
          <tr>
            <td>Verify Status:</td>
            <td>
              {editing ? (
                <select
                  value={updatedUser.isVerified ? "Verified" : "Not Verified"}
                  onChange={(e) =>
                    handleChange("isVerified", e.target.value) // Pass the string value
                  }
                >
                  <option value="Verified">Verified</option>
                  <option value="Not Verified">Not Verified</option>
                </select>
              ) : user.isVerified ? (
                "Verified"
              ) : (
                "Not Verified"
              )}
            </td>
          </tr>
          <tr>
            <td> Phone Number</td>
            <td>
              {editing ? (
                <input
                  type="text"
                  value={updatedUser.phoneNumber || ""}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                />
              ) : (
                user.phoneNumber || "N/A"
              )}
            </td>
          </tr>
          <tr>
            <td>Date of Birth</td>
            <td>
              {editing ? (
                <input
                  type="date"
                  value={updatedUser.dob || ""}
                  onChange={(e) => handleChange("dob", e.target.value)}
                />
              ) : (
                user.dob || "N/A"
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="actions">
        {editing && (
          <button className="btn btn-primary" onClick={saveUser}>
            Save
          </button>
        )}
        <button
          className={`btn ${editing ? "btn-secondary" : "btn-danger"}`}
          onClick={editing ? () => setEditing(false) : () => navigate(-1)}>
          {editing ? "Cancel" : "Delete"}
        </button>
      </div>
    </div>
  );
}
