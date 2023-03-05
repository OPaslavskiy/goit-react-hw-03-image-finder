import React from 'react';
import { createPortal } from 'react-dom';
import { Modal, Overlay } from './Modal.styled';
// import * as basicLightbox from 'basiclightbox';

const modalRoot = document.querySelector('#modal-root');

const ModalWindow = ({ children }) => {
  return createPortal(
    <Overlay>
      <Modal>{children}</Modal>
    </Overlay>,
    modalRoot
  );
};

export default ModalWindow;
