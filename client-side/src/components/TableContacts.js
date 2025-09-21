import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TableContacts.css";

const TableContacts = ({ data, handleDelete, handleEdit }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr key={user.id} className="table-row">
            <td className="fw-bold">{user.name}</td>
            <td className="text-muted">{user.email}</td>
            <td className="text-muted">{user.phone}</td>
            <td>
              {/* Medium device action buttons (icons only) */}
              <div className="medium-device-action-btn">
                <button
                  type="button"
                  className="action-btn"
                  onClick={() => handleEdit(user)}
                >
                  <FaEdit size={18} color="black" />
                </button>
                <button
                  type="button"
                  className="action-btn"
                  onClick={() => handleDelete(user.id)}
                >
                  <FaRegTrashAlt size={18} color="red" />
                </button>
              </div>

              {/* Small device action buttons (text buttons) */}
              <button
                className="button edit-button"
                onClick={() => handleEdit(user)}
              >
                Edit
              </button>

              <button
                className="button delete-button"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableContacts;
