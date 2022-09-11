import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { ImSearch } from 'react-icons/im';
import { Box } from '../Box';
import {
  SearchbarBox,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  handleNameChange = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      toast.warn('Please, enter a query');
      return;
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
    event.currentTarget.reset();
  };

  render() {
    return (
      <Box p="16px">
        <SearchbarBox>
          <SearchForm onSubmit={this.handleSubmit}>
            <SearchFormButton type="submit">
              <ImSearch />
            </SearchFormButton>

            <SearchFormInput
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.pokemonName}
              onChange={this.handleNameChange}
            />
          </SearchForm>
        </SearchbarBox>
      </Box>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
