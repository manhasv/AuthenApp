import { FaInfoCircle, FaPencilAlt, FaTrashAlt, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import PeopleDetails from "./Details";
import "../../CssFolder/Table.css"
import { useNavigate } from "react-router-dom";

export default function PeopleTable({ 
  users = [],
  onDelete,
  onSave,
}: { 
  users?: any[],
  onDelete: (id: string) => void,
  onSave: (id: string, user: any) => void,
}) {
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(`/Application/Admin/Users/${id}`);
  }
  return (
    <div id="wd-people-table" className="people-table-container">
      <PeopleDetails onSave={onSave}/>
      <table className="table table-striped people-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {users.map((user: any) => (
            <tr key={`${user._id}-${user.loginId}`}>
              <td className="wd-full-name">
                <Link
                  to={`/Application/Admin/Users/${user._id}`}
                  className="text-decoration-none user-link">
                  <FaUserCircle className="me-2 fs-1 user-icon" />
                  <span className="wd-first-name">{user.name}</span>
                </Link>
              </td>
              <td>{user.email || "N/A"}</td>
              <td className="wd-role">{user.role}</td>
              <td>{new Date(user.lastLogin).toLocaleDateString() || "N/A"}</td>
              <td>{user.totalActivity || 0}</td>
              <td className="wd-actions">
                <FaInfoCircle
                  className="action-icon edit-icon"
                  onClick={() => handleEdit(user._id)}
                  title="Edit"
                />
                <FaTrashAlt
                  className="action-icon delete-icon"
                  onClick={() => onDelete(user._id)}
                  title="Delete"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
