import PropTypes from 'prop-types';
import { Box } from '../Box';
import ImageGalleryItem from '../ImageGalleryItem';
import { ImageGal } from './ImageGallery.styled';

const ImageGallery = ({ hits }) => {
  return (
    <Box p="16px">
      <ImageGal>
        {hits.map(hit => (
          <ImageGalleryItem hit={hit} key={hit.id} />
        ))}
      </ImageGal>
    </Box>
  );
};
ImageGalleryItem.propTypes = {
  hits: PropTypes.array,
};
export default ImageGallery;
