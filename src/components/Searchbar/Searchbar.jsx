import React from 'react';
import { Component } from 'react';
import {
  SearchbarHeder,
  SearchbarForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';
import { BsFillSearchHeartFill } from 'react-icons/bs';

import Notiflix from 'notiflix';
Notiflix.Notify.init({
  width: '320px',
  position: 'center-top',
  distance: '100px',
  timeout: 1500,
  fontSize: '20px',
});

class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChange = event => {
    const newSearch = event.target.value;
    this.setState({ value: newSearch });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.value) {
      Notiflix.Notify.warning('Enter a search parameter');
    } else this.props.onSearch(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    return (
      <SearchbarHeder>
        <SearchbarForm onSubmit={this.handleSubmit} status={'pending'}>
          <SearchFormBtn type="submit">
            <BsFillSearchHeartFill
              style={{
                color: 'rgb(63, 81, 181)',
                height: '32px',
                width: '32px',
              }}
            />
            <SearchFormBtnLabel>Search</SearchFormBtnLabel>
          </SearchFormBtn>

          <SearchFormInput
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </SearchbarForm>
      </SearchbarHeder>
    );
  }
}

export default Searchbar;
