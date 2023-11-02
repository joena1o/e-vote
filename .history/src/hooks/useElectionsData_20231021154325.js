// hooks/useElectionsData.js
import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
// Import your GraphQL queries
// import { listElections } from '../graphql/queries';

export const useElectionsData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your actual query
        // const result = await API.graphql(graphqlOperation(listElections));
        // setData(result.data.listElections.items);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};
