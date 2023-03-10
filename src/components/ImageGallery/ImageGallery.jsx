import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { Button } from 'components/Button';
import { StyledImageList } from './ImageGallery.styled';
import { Loader } from 'components/Loader/Loader';

import { getImagesBySearchQuery } from 'services/api';

const ImageList = ({ images }) => {
  return (
    <StyledImageList>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      ))}
    </StyledImageList>
  );
};

export const ImageGallery = ({
  searchQuery,
  pageNumber,
  increasePageNumber,
}) => {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    if (pageNumber === 1) {
      setImages([]);
    }
    setStatus('pending');

    getImagesBySearchQuery(searchQuery, pageNumber)
      .then(newImages => {
        setImages(prevState => [...prevState, ...newImages]);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [searchQuery, pageNumber]);

  if (status === 'idle') {
    return;
  }

  if (status === 'pending') {
    return images.length > 0 ? (
      <>
        <ImageList images={images} />
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
        <ImageList images={images} />
        <Button onClick={increasePageNumber} />
      </>
    );
  }
};

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  pageNumber: PropTypes.number.isRequired,
  increasePageNumber: PropTypes.func.isRequired,
};
