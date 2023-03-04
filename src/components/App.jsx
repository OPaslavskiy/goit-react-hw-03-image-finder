import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

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
      <>
        <Searchbar onSearch={this.onSearch} />
        <ImageGallery searchParameter={this.state.searchParameter} />

        {/* <ModalWindow /> */}
      </>
    );
  }
}

export default App;
