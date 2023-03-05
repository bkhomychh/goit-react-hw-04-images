import { Component } from 'react';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { Button } from 'components/Button';
import { StyledImageGallery } from './ImageGallery.styled';
import { Loader } from 'components/Loader/Loader';

import { getImagesBySearchQuery } from 'services/api';

export class ImageGallery extends Component {
  static propTypes = {
    searchQuery: PropTypes.string.isRequired,
  };

  state = {
    images: [],
    page: 1,
    status: 'idle',
    error: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevProps.searchQuery;
    const prevPageNumber = prevState.page;

    const currentSearchQuery = this.props.searchQuery;
    const currentPageNumber = this.state.page;

    console.log(prevPageNumber);
    console.log(currentPageNumber);

    if (prevSearchQuery !== currentSearchQuery) {
      await this.setState({ page: 1 });
      this.loadImages(currentSearchQuery);
    } else if (
      prevSearchQuery === currentSearchQuery &&
      prevPageNumber !== currentPageNumber
    ) {
      this.loadImages(currentSearchQuery);
    }
  }

  loadImages = async currentSearchQuery => {
    try {
      this.setState({ status: 'pending' });

      const pageNumber = this.state.page;
      console.log('pageNumber ' + pageNumber);
      const images = await getImagesBySearchQuery(
        currentSearchQuery,
        pageNumber
      );

      if (pageNumber === 1) {
        this.setState({ images, status: 'resolved' });
      } else {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          status: 'resolved',
        }));
      }
    } catch (error) {
      this.setState({ error, status: 'rejected' });
    }
  };

  increasePageNumber = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, status, error } = this.state;

    if (status === 'idle') {
      return;
    }

    if (status === 'pending') {
      return images.length > 0 ? (
        <>
          <StyledImageGallery>
            {images.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
              />
            ))}
          </StyledImageGallery>
          <Loader />
        </>
      ) : (
        <Loader />
      );
    }

    if (status === 'rejected') {
      return <p>{error.message}</p>;
    }

    if (status === 'resolved') {
      return (
        <>
          <StyledImageGallery>
            {images.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
              />
            ))}
          </StyledImageGallery>
          <Button onClick={this.increasePageNumber} />
        </>
      );
    }
  }
}
