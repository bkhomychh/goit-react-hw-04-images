import { Component } from 'react';

import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { Button } from 'components/Button';
import { getImagesBySearchQuery } from 'services/api';

import { StyledImageGallery } from './ImageGallery.styled';
import { Loader } from 'components/Loader/Loader';

export class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    status: 'idle',
    error: null,
  };

  async componentDidUpdate(prevProps) {
    const prevSearchQuery = prevProps.searchQuery;
    const currentSearchQuery = this.props.searchQuery;

    if (prevSearchQuery === currentSearchQuery) {
      return;
    }

    try {
      this.setState({ status: 'pending', images: [] });

      const images = await getImagesBySearchQuery(currentSearchQuery, 1);

      this.setState({ images, page: 2, status: 'resolved' });
    } catch (error) {
      this.setState({ error, status: 'rejected' });
    }
  }

  loadMore = async () => {
    try {
      this.setState({ status: 'pending' });

      const { searchQuery } = this.props;
      const { page } = this.state;
      const images = await getImagesBySearchQuery(searchQuery, page);

      this.setState(prevState => ({
        images: [...prevState.images, ...images],
        page: prevState.page + 1,
        status: 'resolved',
      }));
    } catch (error) {
      this.setState({ error, status: 'rejected' });
    }
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
          <Button loadMore={this.loadMore} />
        </>
      );
    }
  }
}
