import React, { useState, useEffect } from 'react';
// import { API, graphqlOperation } from 'aws-amplify';
// import { listCandidates } from './graphql/queries';
// import { updateCandidate } from './graphql/mutations';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { setCandidates } from '../../../Redux/CandidateSlice'; 
import styled from 'styled-components';
import DataTable from 'react-data-table-component';

// Styled Components
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

const Title = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

function CandidateScreening() {
  const candidates = useSelector(state => state.candidates);
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
        <StyledButton onClick={() => onViewDetails(row)}>View Details</StyledButton>
      ),
    },
  ];

  const onViewDetails = (candidate) => {
    setSelectedCandidate(candidate);
    setIsDialogOpen(true);
  };

  const filteredCandidates = candidates.filter(candidate => 
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <>
      <DataTable
        title="Candidate Screening"
        columns={columns}
        data={filteredCandidates}
        pagination
        highlightOnHover
        subHeader
        subHeaderComponent={
          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a candidate..."
          />
        }
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
    </>
  );
}

export default CandidateScreening;