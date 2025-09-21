import React from "react";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import "./Contacts.css";
import TableContacts from "./TableContacts";

const Contacts = ({ contactData, handleEdit, handleDelete }) => {
  return (
    <div className="contacts-details-container">
      <div className="contacts-content-container">
        <h2 className="heading">User Contacts</h2>

        {/* Medium device Contacts Data */}
        <TableContacts
          data={contactData}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />

        {/* Small device Contacts Data */}
        <ul className="contact-list-container">
          {contactData.map((user) => (
            <li key={user.id} className="contact-list-item">
              <span className="profile text-primary">
                {user.name[0].toUpperCase()}
              </span>
              <div className="contact-meta-data">
                <h5 className="name">{user.name}</h5>
                <p className="email">{user.email}</p>
                <p className="phone">{user.phone}</p>
              </div>
              <div className="action-buttons">
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
                  <FaRegTrashAlt size={19} color="red" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Contacts;
