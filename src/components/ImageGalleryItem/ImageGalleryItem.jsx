import { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'components/Modal/Modal';
import { Img, StyledImageGalleryItem } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  static propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  };

  state = {
    isModalOpen: false,
  };

  toggleModal = () => {
    this.setState(prevState => {
      return { isModalOpen: !prevState.isModalOpen };
    });
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props;
    const { isModalOpen } = this.state;

    return (
      <StyledImageGalleryItem onClick={this.toggleModal}>
        <Img src={webformatURL} alt={tags} />
        {isModalOpen && (
          <Modal onClose={this.toggleModal}>
            <Img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </StyledImageGalleryItem>
    );
  }
}
