import PropTypes from 'prop-types';

import { StyledSearchBar, Form, Button, Input, Span } from './SearchBar.styled';

export const SearchBar = ({ onSubmit }) => {
  const handleSubmit = evt => {
    evt.preventDefault();

    const searchQuery = evt.target.elements.searchQuery.value.trim();
    onSubmit(searchQuery);
  };

  return (
    <StyledSearchBar>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <Span>Search</Span>
        </Button>

        <Input
          name="searchQuery"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </StyledSearchBar>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
