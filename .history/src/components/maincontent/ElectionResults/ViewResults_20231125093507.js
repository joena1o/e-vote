const generateMockData = () => {
  return [
    {
      id: 1,
      electionName: '2023 SUG General Election',
      date: '2023-01-10',
      electionType: 'Presidential',
      candidates: [
        { name: 'Akinwumi Adesina', votes: 500, position: 'President' },
        { name: 'Aliya Hamza', votes: 650, position: 'President' },
        { name: 'Chukwuma Uche', votes: 350, position: 'President' },
      ],
      winner: 'Aliya Hamza',
    },
    // Add more election data as needed
  ];
};

// Your component code
// ...

const ViewResults = () => {
  const colorModeValue = useColorModeValue('gray.200', 'gray.600');
  const [pastElectionResults] = useState(generateMockData());
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1 });
  }, [controls]);

  const handleCardClick = (electionId) => {
    // Handle the click event, e.g., navigate to a detailed view
    console.log(`Card clicked for election with ID ${electionId}`);
  };

  return (
    <Box p={4}>
      <Heading size="md" mb={4}>
        Past Election Results
      </Heading>
      <Wrap spacing={4}>
        {pastElectionResults.map((election) => (
          <WrapItem key={election.id} flex="1" minW="200px" maxW="300px">
            <div onClick={() => handleCardClick(election.id)}>
              <MotionCard
                initial={{ opacity: 0 }}
                animate={controls}
                transition={{ duration: 0.5 }}
              >
                <CardHeader>
                  <Heading fontSize="sm" fontWeight="semibold">
                    {election.electionName}
                  </Heading>
                </CardHeader>
              <CardBody>
  <Text fontSize="xs">Date: {election.date}</Text>
  <Text fontSize="xs">Election Type: {election.electionType}</Text>
  <Text fontSize="xs">Total Voters: {election.totalVoters}</Text>
  <Text fontSize="xs">Accredited Voters: {election.totalAccreditedVoters}</Text>
  <Text fontSize="xs">Votes Cast: {election.totalVotesCast}</Text>
  <Text fontSize="xs">Result: {election.result}</Text>
  <Text fontSize="xs">
    Winner: <Badge colorScheme="green">{election.winner}</Badge>
  </Text>
  <Table size="sm" variant="simple">
    <Thead>
      <Tr>
        <Th>Candidate</Th>
        <Th isNumeric>Votes</Th>
        <Th>Position</Th>
      </Tr>
    </Thead>
    <Tbody>
      {election.candidates.map((candidate) => (
        <Tr key={candidate.name}>
          <Td fontSize="xs">{candidate.name}</Td>
          <Td isNumeric fontSize="xs">
            {candidate.votes}
          </Td>
          <Td fontSize="xs">{candidate.position}</Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
</CardBody>
</MotionCard>
            </div>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};

export default ViewResults;
