import React, { Component } from 'react';
import { ImageItem, Image } from './ImageGalleryItem.styled';
import ModalWindow from '../Modal/Modal';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState({ showModal: true });
  };

  render() {
    if (this.props.photos) {
      return this.props.photos.map(photo => {
        return (
          <>
            <ImageItem key={photo.id} onClick={this.toggleModal}>
              <Image src={photo.webformatURL} alt={photo.tags} />
              {this.state.showModal && (
                <ModalWindow bigPhoto={photo.largeImageURL} alt={photo.tags} />
              )}
            </ImageItem>
          </>
        );
      });
    }
  }
}

export default ImageGalleryItem;
