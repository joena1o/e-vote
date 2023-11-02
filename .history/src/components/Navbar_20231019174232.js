import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import logo from '../assets/school_logo.jpg'; 
import { useColorMode } from '@chakra-ui/react';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => (props.theme === 'dark' ? '#000' : '#fff')}; // Changed the dark mode background color to black (#000)
    color: ${props => (props.theme === 'dark' ? '#fff' : '#ce7348')};
  }
`;
const Header = styled.header`
  background: ${props => (props.theme === 'dark' ? '#333' : '#fff')}; // Changed the dark mode background color to black (#000) for the navbar
  color: ${props => (props.theme === 'dark' ? '#fff' : '#ce7348')};
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
  background-color: ${props => (props.theme === 'dark' ? '#000' : '#f4f4f4')}; // Changed the dark mode background color to black (#000) for the slider
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
  const { colorMode, toggleColorMode } = useColorMode();

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
