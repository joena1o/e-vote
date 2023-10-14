import { configureStore } from '@reduxjs/toolkit';
import electionReducer from './electionSlice';
import studentsReducer from './studentsSlice'; // Assuming you have a studentsSlice

const store = configureStore({
  reducer: {
    elections: electionReducer,
    students: studentsReducer, // Add the students reducer here
  },
});

export default store;
