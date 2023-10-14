import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define EditAdminForm in the same file
const EditAdminForm = ({ admin, onCancel, onSubmit }) => {
  const [updatedAdminData, setUpdatedAdminData] = useState({
    // Initial state based on admin data, modify as needed
    name: admin.name,
    email: admin.email,
    // Add other fields if necessary
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAdminData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onSubmit function with the updated admin data
    onSubmit(updatedAdminData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Edit Admin</h4>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={updatedAdminData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={updatedAdminData.email}
          onChange={handleChange}
        />
      </label>
      {/* Add other fields as needed */}
      <button type="submit">Update</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

function AdminList() {
  const [admins, setAdmins] = useState([]);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the list of admins from the API
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const adminData = await API.get('AdminAPI', '/admins');
      setAdmins(adminData);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const handleDeleteAdmin = async (adminId) => {
    try {
      // Make an API request to delete the admin
      await API.del('AdminAPI', `/admins/${adminId}`);
      // Remove the deleted admin from the local state
      setAdmins(admins.filter((admin) => admin.id !== adminId));
      toast.success('Admin deleted successfully!', {
        // ...
      });
    } catch (err) {
      setError(err);
      toast.error('Error deleting admin. Please try again.', {
        // ...
      });
    }
  };

  const handleEditClick = (admin) => {
    setEditingAdmin(admin);
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setEditingAdmin(null);
    setIsEditing(false);
  };

  const handleEditSubmit = async (updatedAdminData) => {
    try {
      // Make an API request to update the admin data
      await API.put('AdminAPI', `/admins/${editingAdmin.id}`, {
        body: updatedAdminData,
      });

      // Update the admin data in the local state
      const updatedAdmins = admins.map((admin) =>
        admin.id === editingAdmin.id ? { ...admin, ...updatedAdminData } : admin
      );

      setAdmins(updatedAdmins);

      toast.success('Admin updated successfully!', {
        // ...
      });

      // Clear editing state
      setEditingAdmin(null);
      setIsEditing(false);
    } catch (err) {
      setError(err);
      toast.error('Error updating admin. Please try again.', {
        // ...
      });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h3>Admin List</h3>
      <ul>
        {admins.map((admin) => (
          <li key={admin.id}>
            {admin.name} ({admin.email})
            <button onClick={() => handleDeleteAdmin(admin.id)}>Delete</button>
            <button onClick={() => handleEditClick(admin)}>Edit</button>
          </li>
        ))}
      </ul>
      {isEditing && (
        <EditAdminForm
          admin={editingAdmin}
          onCancel={handleEditCancel}
          onSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
}

export default AdminList;
