
import { createSlice } from '@reduxjs/toolkit';

export const candidatesSlice = createSlice({
  name: 'candidates',
  initialState: [],
  reducers: {
    setCandidates: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCandidates } = candidatesSlice.actions;
export default candidatesSlice.reducer;
