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
    const { id, tags, largeImageURL, webformatURL } = this.props.photo;

    return (
      <>
        <ImageItem key={id} onClick={this.toggleModal}>
          <Image src={webformatURL} alt={tags} />
        </ImageItem>
        {this.state.showModal && (
          <ModalWindow bigPhoto={largeImageURL} alt={tags} />
        )}
      </>
    );
  }
}

export default ImageGalleryItem;
