import styled, { keyframes } from 'styled-components';

const showComponent = keyframes`
  0%{
    opacity: 0;
    transform: scale(0.2)
  }

  100%{
    opacity: 1;
    transform: scale(1)
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

export const ModalWindow = styled.div`
  width: 90vw;
  height: 80vh;

  overflow: hidden;

  animation: ${showComponent} 750ms both;

  img {
    width: 100%;
    height: 100%;

    object-fit: contain;

    &:hover {
      transform: none;
      cursor: auto;
    }
  }
`;
