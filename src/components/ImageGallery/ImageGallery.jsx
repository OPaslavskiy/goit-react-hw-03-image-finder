import React from 'react';
import { Component } from 'react';
import Loader from '../Loader/Loader';
import ButtonLoad from '../Button/Button';
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
    gallery: [],
    error: '',
    status: 'stoped',
    page: 1,
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
            this.setState({
              gallery: [...this.state.gallery, ...photo.hits],
              status: 'resolved',
            });
            if (prevProps.searchParameter !== this.props.searchParameter) {
              this.setState({
                gallery: [...photo.hits],
                status: 'resolved',
              });
            }
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

  handleLoad = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { status, gallery, error } = this.state;
    if (status === 'pending') return <Loader />;
    if (status === 'resolved')
      return (
        <>
          <ImageGalleryUl>
            <ImageGalleryItem photos={gallery} />
          </ImageGalleryUl>
          <ButtonLoad handleLoad={this.handleLoad} />
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
