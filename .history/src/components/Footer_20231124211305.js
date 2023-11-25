import React from 'react';
import { Box, Flex, Text, Link } from '@chakra-ui/react';

const Footer = () => {
  const handleDownloadDocumentation = () => {
    
    const pdfUrl = '/path/to/your/documentation.pdf';

    //  anchor element that triggers  download
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'documentation.pdf';
    link.click();
  };

  return (
    <Box as="footer" mt="auto" py={4} bg="gray.800" color="white">
      <Flex justify="space-between" align="center">
        <Text>&copy; 2023 Student Union Voting System</Text>
        <Flex>
          <Link mx={2} href="#about">
            About
          </Link>
          <Link mx={2} href="#contact">
            Contact
          </Link>
          <Link mx={2} href="#privacy">
            Privacy Policy
          </Link>
          <Link mx={2} onClick={handleDownloadDocumentation}>
            Help
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
