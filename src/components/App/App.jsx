import { useState, memo } from 'react';

import { SearchBar } from 'components/SearchBar';
import { ImageGallery } from 'components/ImageGallery';
import { StyledApp } from './App.styled';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  const updateSearchQuery = newSearchQuery => {
    setSearchQuery(newSearchQuery);
    setPageNumber(1);
  };

  const increasePageNumber = () => {
    setPageNumber(prevState => prevState + 1);
  };

  return (
    <StyledApp>
      <SearchBar onSubmit={updateSearchQuery} />
      <ImageGallery
        searchQuery={searchQuery}
        pageNumber={pageNumber}
        increasePageNumber={increasePageNumber}
      ></ImageGallery>
    </StyledApp>
  );
};

export default memo(App);
