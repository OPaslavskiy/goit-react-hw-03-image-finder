import { Component } from 'react';
import { GlobalStyle } from '../GlobalStyle';
import { Layout } from '../Layout';
import { getPhoto } from '../services/getPhoto';
import { TitelWithoutImg } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ButtonLoad from './Button/Button';

import Notiflix from 'notiflix';
Notiflix.Notify.init({
  width: '320px',
  position: 'center-top',
  distance: '100px',
  timeout: 1500,
  fontSize: '20px',
});

class App extends Component {
  state = {
    gallery: [],
    error: '',
    status: 'stoped',
    page: 1,
    searchParameter: '',
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.searchParameter !== this.state.searchParameter ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: 'pending' });

      getPhoto(this.state.searchParameter, this.state.page)
        .then(response => response.json())
        .then(photo => {
          if (photo.hits.length) {
            this.setState({
              gallery: [...this.state.gallery, ...photo.hits],
              status: 'resolved',
            });
            if (prevState.searchParameter !== this.state.searchParameter) {
              this.setState({
                gallery: [...photo.hits],
                status: 'resolved',
                page: 1,
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
    let Scroll = require('react-scroll');
    let scroll = Scroll.animateScroll;
    scroll.scrollMore(window.innerHeight - 125);
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onSearch = searchParameter => {
    this.setState({ searchParameter });
  };

  render() {
    return (
      <Layout>
        <GlobalStyle />

        <Searchbar onSearch={this.onSearch} />
        {this.state.searchParameter ? (
          <ImageGallery
            gallery={this.state.gallery}
            status={this.state.status}
            error={this.state.error}
          />
        ) : (
          <TitelWithoutImg>
            Start searching for the best images...
          </TitelWithoutImg>
        )}

        {this.state.gallery.length > 0 && (
          <ButtonLoad handleLoad={this.handleLoad} />
        )}
      </Layout>
    );
  }
}

export default App;
