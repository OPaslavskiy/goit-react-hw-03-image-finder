import React from 'react';
import { Component } from 'react';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryUl } from './ImageGallery.styled';
import { getPhoto } from '../../services/getPhoto';
import Notiflix from 'notiflix';
Notiflix.Notify.init({
  width: '320px',
  position: 'center-top',
  distance: '100px',
  timeout: 1500,
  fontSize: '20px',
});

class ImageGallery extends Component {
  state = {
    gallery: {},
    error: '',
    status: 'stoped',
    page: 1,
  };

  handleLoad = () => {
    console.log(`123456`);
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.searchParameter !== this.props.searchParameter ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: 'pending' });

      getPhoto(this.props.searchParameter, this.state.page)
        .then(response => response.json())
        .then(photo => {
          if (photo.hits.length) {
            this.setState({ gallery: photo, status: 'resolved' });
          } else {
            Notiflix.Notify.warning('Enter a valid search parameter');
            this.setState({ status: 'rejected' });
          }
        })
        .catch(error => {
          this.setState({ error, status: 'rejected' });
        });
    }
  }

  render() {
    const { status, gallery, error } = this.state;
    if (status === 'pending') return <Loader />;
    if (status === 'resolved')
      return (
        <>
          <ImageGalleryUl>
            <ImageGalleryItem photos={gallery} />
          </ImageGalleryUl>
          <Button type="button" onClick={this.handleLoad} />
        </>
      );

    if (status === 'rejected') {
      return (
        <div>
          <h2>{error}</h2>
        </div>
      );
    }
  }
}

export default ImageGallery;
