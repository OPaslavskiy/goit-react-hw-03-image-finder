import React from 'react';
import { ImageItem, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ photos }) => {
  console.log(photos);
  if (photos.hits) {
    return photos.hits.map(photo => {
      return (
        <ImageItem key={photo.id}>
          <Image src={photo.largeImageURL} alt={photo.tags} />
        </ImageItem>
      );
    });
  }
};

export default ImageGalleryItem;
