import React, { Component } from 'react';
import { ImageItem, Image } from './ImageGalleryItem.styled';
import ModalWindow from '../Modal/Modal';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  render() {
    const { tags, largeImageURL, webformatURL } = this.props.photo;

    return (
      <>
        <ImageItem onClick={this.toggleModal}>
          <Image src={webformatURL} alt={tags} />
        </ImageItem>
        {this.state.showModal && (
          <ModalWindow>
            <img src={largeImageURL} alt={tags} />
            <button type="button" onClick={this.toggleModal}>
              Close
            </button>
          </ModalWindow>
        )}
      </>
    );
  }
}

export default ImageGalleryItem;
