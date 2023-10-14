import { createSlice } from '@reduxjs/toolkit';

export const studentsSlice = createSlice({
  name: 'students',
  initialState: [],
  reducers: {
    addStudents: (state, action) => {
      // Add students to the Redux store
      action.payload.forEach(student => {
        state.push(student);
      });
    },
  },
});

export const { addStudents } = studentsSlice.actions;

export default studentsSlice.reducer;
