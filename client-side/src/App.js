import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Contacts from "./components/Contacts";
import EditContactModal from "./components/EditContactModal";
import PaginationSection from "./components/PaginationSection";
import AddContactModal from "./components/AddContactModal";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalContacts, setTotalContacts] = useState(null);

  const limit = 5;

  const fetchContacts = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/contacts?page=${page}&limit=${limit}`
      );

      setContacts(response.data.contacts || []);
      setTotalPages(response.data.totalPages || 0);
      setTotalContacts(response.data.total);
      setCurrentPage(page);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts(currentPage);
  }, [currentPage]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/contacts/${id}`);
      fetchContacts(currentPage);
    } catch (err) {
      console.error("Error deleting contact:", err);
    }
  };

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setShowEditModal(true);
  };

  const handleUpdate = (updatedContact) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === updatedContact.id ? updatedContact : c))
    );
    setShowEditModal(false);
    setSelectedContact(null);
  };

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleAddSubmit = async (newContact) => {
    try {
      await axios.post(`http://localhost:5000/contacts`, newContact);
      fetchContacts(currentPage);
      setShowAddModal(false);
    } catch (err) {
      console.log("Error while adding contact: ", err);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="app-container">
      <Header handleModalShow={handleAdd} />

      <div className="contact-book-body">
        {loading ? (
          <p className="text-center mt-3">Loading contacts...</p>
        ) : (
          <>
            {contacts.length === 0 ? (
              <p className="text-center mt-3 text-muted">No contacts found</p>
            ) : (
              <>
                <Contacts
                  contactData={contacts}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />

                <PaginationSection
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                  currentPageItemsCount={contacts.length}
                  totalContacts={totalContacts}
                />
              </>
            )}
          </>
        )}
      </div>

      {selectedContact && (
        <EditContactModal
          show={showEditModal}
          contact={selectedContact}
          handleClose={() => {
            setShowEditModal(false);
            setSelectedContact(null);
          }}
          onUpdate={handleUpdate}
        />
      )}

      <AddContactModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        handleSubmit={handleAddSubmit}
      />
    </div>
  );
}

export default App;
