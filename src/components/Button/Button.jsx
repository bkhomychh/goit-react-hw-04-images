import { StyledBtn } from './Button.styled';

export const Button = ({ onClick }) => {
  return (
    <StyledBtn type="button" onClick={onClick}>
      Load more
    </StyledBtn>
  );
};
