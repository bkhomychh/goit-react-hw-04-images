import { Component } from 'react';

import { SearchBar } from 'components/SearchBar';
import { ImageGallery } from 'components/ImageGallery';

import { StyledApp } from './App.styled';

export class App extends Component {
  state = {
    searchQuery: '',
  };

  updateSearchQuery = newSearchQuery => {
    this.setState({ searchQuery: newSearchQuery });
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <StyledApp>
        <SearchBar onSubmit={this.updateSearchQuery} />
        <ImageGallery searchQuery={searchQuery}></ImageGallery>
      </StyledApp>
    );
  }
}
