import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import Modal from '../Modal';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ hit }) => {
  console.log(hit);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <Box p="16px">
      <GalleryItem>
        <GalleryItemImage
          src={hit.webformatURL}
          alt={hit.tags}
          onClick={toggleModal}
        />
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={hit.largeImageURL} alt={hit.tags} />
          </Modal>
        )}
      </GalleryItem>
    </Box>
  );
};

ImageGalleryItem.propTypes = {
  hits: PropTypes.array,
  showModal: PropTypes.bool,
};
export default ImageGalleryItem;
