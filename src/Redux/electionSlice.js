/*import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API, graphqlOperation } from 'aws-amplify';
import { createElection as createElectionAPI } from '../graphql/mutations';

export const createElection = createAsyncThunk(
  'elections/createElection',
  async (election, { rejectWithValue }) => {
    try {
      const result = await API.graphql(graphqlOperation(createElectionAPI, { input: election }));
      return result.data.createElection;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const electionSlice = createSlice({
  name: 'elections',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createElection.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export default electionSlice.reducer;
*/