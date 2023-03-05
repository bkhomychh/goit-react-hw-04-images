import { PureComponent } from 'react';

import { SearchBar } from 'components/SearchBar';
import { ImageGallery } from 'components/ImageGallery';
import { StyledApp } from './App.styled';

export class App extends PureComponent {
  state = {
    searchQuery: '',
    page: 1,
  };

  updateSearchQuery = newSearchQuery => {
    this.setState({ searchQuery: newSearchQuery, page: 1 });
  };

  increasePageNumber = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { searchQuery, page } = this.state;

    return (
      <StyledApp>
        <SearchBar onSubmit={this.updateSearchQuery} />
        <ImageGallery
          searchQuery={searchQuery}
          page={page}
          increasePageNumber={this.increasePageNumber}
        ></ImageGallery>
      </StyledApp>
    );
  }
}
