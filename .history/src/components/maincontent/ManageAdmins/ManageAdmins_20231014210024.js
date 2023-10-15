import React from 'react';
import AddAdmin from './AddAdmin';
import AdminList from './AdminList';

function ManageAdmins() {
  return (
    <div>
      <h2>Manage Admins</h2>
      <AddAdmin />
      <AdminList />
    </div>
  );
}

export default ManageAdmins;
