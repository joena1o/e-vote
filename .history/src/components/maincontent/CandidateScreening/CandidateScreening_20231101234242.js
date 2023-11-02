import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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

function CandidateScreening() {
  const candidates = useSelector((state) => state.candidates);
  const [searchTerm, setSearchTerm] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const onViewDetails = (candidate) => {
    setSelectedCandidate(candidate);
    onOpen();
  };

  const filteredCandidates = candidates.filter((candidate) =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <Button colorScheme="blue" onClick={() => onViewDetails(candidate)}>
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
              {/* Include any other details you want to show */}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              {/* Include any other actions you want to offer */}
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
}

export default CandidateScreening;
