import { configureStore } from '@reduxjs/toolkit';
import electionReducer from './electionSlice';
import studentsReducer from './studentsSlice';
import candidatesReducer from './CandidateSlice'; // Import the candidates reducer

const store = configureStore({
  reducer: {
    elections: electionReducer,
    students: studentsReducer,
    candidates: candidatesReducer, // Add the candidates reducer here
  },
});

export default store;
