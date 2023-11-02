import React, { useState } from 'react';
import {
  Box,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from '@chakra-ui/react';

// Mock data array
const mockCandidates = [
  {
    id: 1,
    name: 'Chinua Achebe',
    position: 'President',
    cgpa: 3.8,
    qualificationStatus: 'Qualified',
  },
  {
    id: 2,
    name: 'Wole Soyinka',
    position: 'Vice President',
    cgpa: 3.7,
    qualificationStatus: 'Qualified',
  },
  {
    id: 3,
    name: 'Flora Nwapa',
    position: 'Secretary',
    cgpa: 3.9,
    qualificationStatus: 'Qualified',
  },
  {
    id: 4,
    name: 'Buchi Emecheta',
    position: 'Treasurer',
    cgpa: 3.5,
    qualificationStatus: 'Qualified',
  },
  {
    id: 5,
    name: 'Ben Okri',
    position: 'Public Relations Officer',
    cgpa: 3.4,
    qualificationStatus: 'Not Qualified',
    reason: 'CGPA below required threshold',
  },
  {
    id: 6,
    name: 'Chimamanda Ngozi Adichie',
    position: 'Academic Officer',
    cgpa: 4.0,
    qualificationStatus: 'Qualified',
  },
  {
    id: 7,
    name: 'Nnedi Okorafor',
    position: 'Sports Director',
    cgpa: 3.2,
    qualificationStatus: 'Not Qualified',
    reason: 'Lacks required sports management experience',
  },
  {
    id: 8,
    name: 'Teju Cole',
    position: 'Welfare Officer',
    cgpa: 3.6,
    qualificationStatus: 'Qualified',
  },
  {
    id: 9,
    name: 'Helon Habila',
    position: 'President',
    cgpa: 3.1,
    qualificationStatus: 'Not Qualified',
    reason: 'Disciplinary issues',
  },
  {
    id: 10,
    name: 'Sefi Atta',
    position: 'Senator',
    cgpa: 3.7,
    qualificationStatus: 'Qualified',
  },
];

function CandidateScreening() {
  const [searchTerm, setSearchTerm] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const onViewDetails = (candidate) => {
    setSelectedCandidate(candidate);
    onOpen();
  };

  const filteredCandidates = searchTerm
    ? mockCandidates.filter((candidate) =>
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : mockCandidates;

  return (
    <Box w="100%" h="100vh" p={6} overflowY="auto">
      <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
        <Text fontSize="2xl">Candidate Screening</Text>
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a candidate..."
          width="300px"
        />
      </Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>S/N</Th>
            <Th>Candidate Name</Th>
            <Th>Position Contested For</Th>
            <Th>CGPA</Th>
            <Th>Qualification Status</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredCandidates.map((candidate, index) => (
            <Tr key={candidate.id}>
              <Td>{index + 1}</Td>
              <Td>{candidate.name}</Td>
              <Td>{candidate.position}</Td>
              <Td>{candidate.cgpa}</Td>
              <Td>{candidate.qualificationStatus}</Td>
              <Td>
                <Button colorScheme="yellow.500" onClick={() => onViewDetails(candidate)}>
                  View Details
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {selectedCandidate && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedCandidate.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text><strong>Position Contested For:</strong> {selectedCandidate.position}</Text>
              <Text><strong>CGPA:</strong> {selectedCandidate.cgpa}</Text>
              <Text><strong>Qualification Status:</strong> {selectedCandidate.qualificationStatus}</Text>
              {selectedCandidate.reason && (
                <Text color="red.500"><strong>Reason:</strong> {selectedCandidate.reason}</Text>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
}

export default CandidateScreening;
