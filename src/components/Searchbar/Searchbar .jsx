import { useState } from 'react';
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

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleNameChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      toast.warn('Please, enter a query');
      return;
    } else {
      onSubmit(query);
      setQuery('');
    }
    event.currentTarget.reset();
  };

  return (
    <Box p="16px">
      <SearchbarBox>
        <SearchForm onSubmit={handleSubmit}>
          <SearchFormButton type="submit">
            <ImSearch />
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={handleNameChange}
          />
        </SearchForm>
      </SearchbarBox>
    </Box>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
