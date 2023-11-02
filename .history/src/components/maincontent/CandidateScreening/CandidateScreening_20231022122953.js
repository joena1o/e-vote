import React, { useState, useEffect } from 'react';
// import { API, graphqlOperation } from 'aws-amplify';
// import { listCandidates } from './graphql/queries';
// import { updateCandidate } from './graphql/mutations';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { setCandidates } from '../../../Redux/CandidateSlice'; 
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
  width: 100%;
`;

const Title = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const CandidateList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CandidateItem = styled.li`
  background-color: #fff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const CandidateName = styled.h3`
  color: #444;
  margin-top: 0;
`;

const CandidateDescription = styled.p`
  color: #777;
`;

const StyledButton = styled.button`
  padding: 8px 15px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ddd;
  }
`;

function CandidateScreening() {
  const candidates = useSelector(state => state.candidates);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const columns = [
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Description',
      selector: 'description',
      sortable: true,
    },
    {
      name: 'Nominated By',
      selector: 'nominatedBy',
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <div>
          <StyledButton onClick={() => onViewDetails(row)}>View Details</StyledButton>
        </div>
      ),
    },
  ];

  const filteredCandidates = candidates.filter(candidate => 
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onViewDetails = (candidate) => {
    setSelectedCandidate(candidate);
    setIsDialogOpen(true);
  };

  useEffect(() => {
    // fetchCandidates();
  }, []);

  /* 
  const fetchCandidates = async () => {
    try {
      const candidateData = await API.graphql(graphqlOperation(listCandidates));
      const candidateList = candidateData.data.listCandidates.items;
      dispatch(setCandidates(candidateList)); // Update Redux store
    } catch (error) {
      console.error("Error fetching candidates", error);
    }
  };
  */

  /* 
  const onApprove = async (id) => {
    try {
      await API.graphql(graphqlOperation(updateCandidate, {
        input: {
          id,
          status: 'Approved'
        }
      }));
      fetchCandidates();
    } catch (error) {
      console.error("Error approving candidate", error);
    }
  };

  const onReject = async (id) => {
    try {
      await API.graphql(graphqlOperation(updateCandidate, {
        input: {
          id,
          status: 'Rejected'
        }
      }));
      fetchCandidates();
    } catch (error) {
      console.error("Error rejecting candidate", error);
    }
  };
  */

  return (
    <Container>
      <Title>Candidate Screening</Title>
      <SearchInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a candidate..."
      />

      <DataTable
        title="Candidates"
        columns={columns}
        data={filteredCandidates}
        pagination
        highlightOnHover
        subHeader
        subHeaderComponent={<SearchInput />}
      />

      {isDialogOpen && (
        <Modal
          isOpen={isDialogOpen}
          onRequestClose={() => setIsDialogOpen(false)}
          contentLabel="Candidate Details"
        >
          <h3>{selectedCandidate.name}</h3>
          <p>{selectedCandidate.description}</p>
          <p>Nominated by: {selectedCandidate.nominatedBy}</p>
        </Modal>
      )}
    </Container>
  );
}

export default CandidateScreening;
