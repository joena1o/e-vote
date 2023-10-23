import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* Add the following line to ensure Container fills the screen height */
  height: 100vh;
  width: 100%; /* Use 100% to fill the entire width of the screen */
`;


export const Content = styled.div`
  display: flex;
  /* Add the following line to ensure Content fills the remaining screen space */
  flex: 1;
`;


