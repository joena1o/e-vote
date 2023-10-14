import { API } from 'aws-amplify';

export const fetchTotalVoters = async () => {
  try {
    const response = await API.get('yourApiName', '/pathToTotalVoters');
    return response.totalVoters;
  } catch (error) {
    throw error;
  }
};

export const fetchUpcomingElections = async () => {
  try {
    const response = await API.get('yourApiName', '/pathToUpcomingElections');
    return response.upcomingElections;
  } catch (error) {
    throw error;
  }
};
