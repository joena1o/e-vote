import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import logo from '../assets/school_logo.jpg'; 
import { useColorMode } from '@chakra-ui/react';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => (props.theme === 'dark' ? '#333' : '#fff')};
    color: ${props => (props.theme === 'dark' ? '#fff' : '#ce7348')}; // Modified text color to #ce7348 for light mode
  }
`;

const Header = styled.header`
  background: ${props => (props.theme === 'dark' ? 'linear-gradient(to right, #ce7348, #9a552e)' : '#fff')}; // Modified background color to white for light mode
  color: ${props => (props.theme === 'dark' ? '#fff' : '#ce7348')}; // Modified text color to #ce7348 for light mode
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  font-family: 'Poppins', sans-serif;
`;

const Logo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 1px;
`;

const ToggleSlider = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: auto;
`;

const SliderInput = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

const Slider = styled.div`
  width: 40px;
  height: 20px;
  background-color: ${props => (props.theme === 'dark' ? '#333' : '#f4f4f4')};
  border-radius: 20px;
  position: relative;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &::after {
    content: '';
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => (props.theme === 'dark' ? '#fff' : '#ccc')};
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: ${props => (props.theme === 'dark' ? '20px' : '0')};
    transition: left 0.3s ease;
  }
`;

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode(); // Use Chakra UI's useColorMode hook

  return (
    <>
      <GlobalStyle theme={colorMode} />
      <Header theme={colorMode}> 
        <Logo src={logo} alt="University Logo" />
        <Title>MAU Student Union Voting</Title>
        <ToggleSlider>
          <SliderInput type="checkbox" onChange={toggleColorMode} />
          <Slider theme={colorMode} />
        </ToggleSlider>
      </Header>
    </>
  );
}

export default Navbar;
