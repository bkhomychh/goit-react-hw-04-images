import { Img, StyledImageGalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  return (
    <StyledImageGalleryItem>
      <Img src={webformatURL} alt={tags} />
      {/* src={largeImageURL} */}
    </StyledImageGalleryItem>
  );
};
