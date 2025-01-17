import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import PeopleDetails from "./Details";
import "../../CssFolder/Table.css"

export default function PeopleTable({ users = [] }: { users?: any[] }) {
  return (
    <div id="wd-people-table" className="people-table-container">
      <PeopleDetails />
      <table className="table table-striped people-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Email</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
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
              <td>{user._id}</td>
              <td>{user.email || "N/A"}</td>
              <td className="wd-role">{user.role}</td>
              <td>{user.lastLogin || "N/A"}</td>
              <td>{user.totalActivity || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
