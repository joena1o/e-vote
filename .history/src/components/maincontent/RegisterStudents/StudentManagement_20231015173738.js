import React from 'react';
import ManageStudents from './ManageStudents';
import RegisterStudents from './RegisterStudents';

function StudentManagement() {
  return (
    <div>
      <h1>Student Management</h1>
      <ManageStudents />
      <RegisterStudents />
    </div>
  );
}

export default StudentManagement;
