import { Component } from 'react';
import PropTypes from 'prop-types';

import { StyledSearchBar, Form, Button, Input, Span } from './SearchBar.styled';

export class SearchBar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleSubmit = evt => {
    evt.preventDefault();

    const searchQuery = evt.target.elements.searchQuery.value.trim();
    this.props.onSubmit(searchQuery);
  };

  render() {
    return (
      <StyledSearchBar>
        <Form onSubmit={this.handleSubmit}>
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
  }
}
