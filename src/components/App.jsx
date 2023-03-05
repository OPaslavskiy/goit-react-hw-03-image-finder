import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { GlobalStyle } from '../GlobalStyle';
import { Layout } from '../Layout';

// import ModalWindow from './Modal/Modal';

class App extends Component {
  state = {
    searchParameter: '',
  };

  onSearch = searchParameter => {
    this.setState({ searchParameter });
  };

  render() {
    return (
      <Layout>
        <GlobalStyle />
        <Searchbar onSearch={this.onSearch} />
        <ImageGallery searchParameter={this.state.searchParameter} />
        {/* <ModalWindow /> */}
      </Layout>
    );
  }
}

export default App;
