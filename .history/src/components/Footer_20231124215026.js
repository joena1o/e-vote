import React from 'react';
import { Box, Container, Stack, Text, Link, useColorModeValue } from '@chakra-ui/react';

const Footer = ({ colorMode }) => {
  const handleDownloadDocumentation = () => {
    const pdfUrl = '/path/to/your/documentation.pdf';

    // Create an anchor element that triggers the download
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'documentation.pdf';
    link.click();
  };

  return (
    <Box
      as="footer"
      mt="auto"
      py={4}
      bg={useColorModeValue('gray.100', 'gray.800')}
      color={useColorModeValue('gray.600', 'gray.300')}
    >
      <Container
        maxW="6xl"
        px={{ base: 4, md: 8 }}
        direction={{ base: 'column', md: 'row' }}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 4, md: 8 }}
          justify="center"
          align="center"
        >
          <Link href="#about">About</Link>
          <Link href="#contact">Contact</Link>
          <Link href="#privacy">Privacy Policy</Link>
          <Link onClick={handleDownloadDocumentation}>Help</Link>
        </Stack>
        <Text>&copy; 2023 Student Union Voting System</Text>
      </Container>
    </Box>
  );
};

export default Footer;
