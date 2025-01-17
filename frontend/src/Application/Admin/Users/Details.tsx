import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import { FaUserCircle } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import "../../CssFolder/PeopleDetails.css";
import * as client from "../../Account/client";

export default function PeopleDetails() {
  const { uid } = useParams();
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUser = async () => {
    setLoading(true);
    try {
      let fetchedUser;
      if (uid) {
        fetchedUser = await client.fetchUserWithID(uid);
      } else {
        // Mocked user data for testing
        fetchedUser = {
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
        };
      }
      setUser(fetchedUser.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveUser = async () => {
    const [firstName, lastName = ""] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName };
    setUser(updatedUser);
    setEditing(false);
  };

  const deleteUser = () => {
    navigate(-1); // Simulate delete and navigate back
  };

  useEffect(() => {
    fetchUser();
  }, [uid]);

  if (!uid) return <div>User ID is missing.</div>;

  if (loading) return <div>Loading...</div>;

  if (!user) return <div>Failed to load user details.</div>;

  return (
    <div className="details-panel">
      <button className="close-button" onClick={() => navigate("/Application/Admin/Users")}>
        <IoCloseSharp />
      </button>
      <div className="header">
        <FaUserCircle className="user-icon" />
        {editing ? (
          <input
            className="name-input"
            defaultValue={`${user.name}`}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && saveUser()}
          />
        ) : (
          <div className="name" onClick={() => setEditing(true)}>
            {user.name}
            <FaPencil className="edit-icon" />
          </div>
        )}
      </div>
      <table className="details-table">
        <tbody>
          <tr>
            <td>Role:</td>
            <td>{user.role || "N/A"}</td>
          </tr>
          <tr>
            <td>Login ID:</td>
            <td>{user._id || "N/A"}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{user.email || "N/A"}</td>
          </tr>
          <tr>
            <td>Last Login:</td>
            <td>{user.lastLogin || "N/A"}</td>
          </tr>
          <tr>
            <td>Verify Status:</td>
            <td>{user.isVerified ? "Verified" : "Not Verified"}</td>
          </tr>
        </tbody>
      </table>
      <div className="actions">
        <button className="btn btn-danger" onClick={deleteUser}>
          Delete
        </button>
        <button className="btn btn-secondary" onClick={() => navigate("/Application/Admin/Users")}>
          Cancel
        </button>
      </div>
    </div>
  );
}
