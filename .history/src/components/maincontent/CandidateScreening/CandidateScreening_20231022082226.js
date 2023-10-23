import React, { useState, useEffect } from 'react';
// import { API, graphqlOperation } from 'aws-amplify';
// import { listCandidates } from './graphql/queries';
// import { updateCandidate } from './graphql/mutations';
import Dialog from 'react-dialog';
import { useSelector, useDispatch } from 'react-redux';
import { setCandidates } from './candidatesSlice'; // Adjust path if needed

function CandidateScreening() {
  const candidates = useSelector(state => state.candidates);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const ITEMS_PER_PAGE = 10;

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

  const onViewDetails = (candidate) => {
    setSelectedCandidate(candidate);
    setIsDialogOpen(true);
  };

  const filteredCandidates = candidates.filter(candidate => 
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedCandidates = filteredCandidates.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div>
      <h2>Candidate Screening</h2>

      {/* Search Bar */}
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a candidate..."
      />

      <ul>
        {paginatedCandidates.map(candidate => (
          <li key={candidate.id}>
            <h3>{candidate.name}</h3>
            <p>{candidate.description}</p>
            <p>Nominated by: {candidate.nominatedBy}</p>
            {/* 
            <button onClick={() => onApprove(candidate.id)}>Approve</button>
            <button onClick={() => onReject(candidate.id)}>Reject</button>
            */}
            <button onClick={() => onViewDetails(candidate)}>View Details</button>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      <button onClick={() => setCurrentPage(currentPage + 1)} disabled={filteredCandidates.length <= currentPage * ITEMS_PER_PAGE}>
        Next
      </button>

      {/* Candidate Details Dialog */}
      {isDialogOpen && (
        <Dialog
          title="Candidate Details"
          modal={true}
          onClose={() => setIsDialogOpen(false)}
        >
          <h3>{selectedCandidate.name}</h3>
          <p>{selectedCandidate.description}</p>
          <p>Nominated by: {selectedCandidate.nominatedBy}</p>
          {/* Add more details as needed */}
        </Dialog>
      )}
    </div>
  );
}

export default CandidateScreening;
