import styled from 'styled-components';

export const StyledImageList = styled.ul`
  padding: 0 20px;
  margin-top: 0;
  margin-bottom: 0;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  max-width: 100%;

  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;
