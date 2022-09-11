import { Component } from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import Modal from '../Modal';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    const { hit } = this.props;
    return (
      <Box p="16px">
        <GalleryItem>
          <GalleryItemImage
            src={hit.webformatURL}
            alt={hit.tags}
            onClick={this.toggleModal}
          />
          {this.state.showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={hit.largeImageURL} alt={hit.tags} />
            </Modal>
          )}
        </GalleryItem>
      </Box>
    );
  }
}
ImageGalleryItem.propTypes = {
  hits: PropTypes.array,
  showModal: PropTypes.bool,
};
