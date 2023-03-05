import React from 'react';
import { Modal, Overlay } from './Modal.styled';
// import * as basicLightbox from 'basiclightbox';

const ModalWindow = ({ bigPhoto, alt }) => {
  return (
    <Overlay>
      <Modal>
        <img src={bigPhoto} alt={alt} />
      </Modal>
    </Overlay>
  );
};

export default ModalWindow;
