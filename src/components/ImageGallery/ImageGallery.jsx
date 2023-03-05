import React from 'react';
import { ImageGalleryUl } from './ImageGallery.styled';
import Loader from '../Loader/Loader';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ status, error, gallery }) => {
  if (status === 'pending') return <Loader />;

  if (status === 'resolved')
    return (
      <>
        <ImageGalleryUl>
          {gallery.map(photo => {
            return <ImageGalleryItem photo={photo} />;
          })}
        </ImageGalleryUl>
      </>
    );

  if (status === 'rejected') {
    return (
      <div>
        <h2>{error}</h2>
      </div>
    );
  }
};

export default ImageGallery;
