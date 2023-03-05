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
    page: PropTypes.number.isRequired,
    increasePageNumber: PropTypes.func.isRequired,
  };

  state = {
    images: [],
    status: 'idle',
    error: null,
  };

  async componentDidUpdate(prevProps) {
    const { page: prevPage, searchQuery: prevSearchQuery } = prevProps;
    const { page: currentPage, searchQuery: currentSearchQuery } = this.props;

    if (
      prevSearchQuery !== currentSearchQuery ||
      (prevSearchQuery === currentSearchQuery && prevPage !== currentPage)
    ) {
      this.loadImages(currentSearchQuery);
    }
  }

  loadImages = async currentSearchQuery => {
    try {
      this.setState({ status: 'pending' });

      const pageNumber = this.props.page;
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

  render() {
    const { images, status, error } = this.state;
    const { increasePageNumber } = this.props;

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
          <Button onClick={increasePageNumber} />
        </>
      );
    }
  }
}
