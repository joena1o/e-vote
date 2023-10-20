import styled, { keyframes } from 'styled-components';

// Fade-in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Slide-down animation
const slideDown = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const HomeContainer = styled.section`
  padding: 20px;
  /* Additional styling */
  animation: ${fadeIn} 1s ease-in-out;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 100vh;
  size: 100%;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  /* Additional styling */
  animation: ${slideDown} 1s ease-in-out;
`;

export const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  /* Additional styling */

  & > * {
    animation: ${fadeIn} 1s ease-in-out;
    animation-delay: calc(0.3s * var(--i));
  }
`;

export const StatItem = styled.p`
  font-size: 18px;
  /* Additional styling */
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;
