import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalStyle } from './GlobalStyle';
import { Box } from './Box';
import { fetchPhotos } from '../services/api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';

export default class App extends Component {
  state = {
    page: 1,
    query: '',
    hits: [],
    status: 'idle',
  };

  async componentDidUpdate(_, prevState) {
    try {
      const prevPage = prevState.page;
      const currentPage = this.state.page;
      const prevQuery = prevState.query;
      const currentQuery = this.state.query;

      if (prevPage !== currentPage || prevQuery !== currentQuery) {
        this.setState({ status: 'pending' });
        const data = await fetchPhotos(currentQuery, currentPage);
        const { hits, total } = data;

        if (total === 0 || (hits.length === 0 && hits.totalHits > 0)) {
          this.setState({ status: 'idle' });
          return;
        }
        this.setState({ status: 'resolved' });
        this.setState(prevState => ({
          hits: [...prevState.hits, ...hits],
        }));
        return;
      }
    } catch (error) {
      this.setState({ status: 'rejected' });
    }
  }

  handleFormSubmit = query => {
    this.setState({
      query: query,
      page: 1,
      hits: [],
      status: 'idle',
    });
  };
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  render() {
    const { hits, status } = this.state;
    return (
      <Box
        as="main"
        display="grid"
        grid-template-columns="1fr"
        gridGap="16px"
        pb="24p"
      >
        <GlobalStyle />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Searchbar onSubmit={this.handleFormSubmit} />
        {hits.length > 0 && <ImageGallery hits={hits} />}
        {status === 'pending' && <Loader />}
        {hits.length >= 12 && hits.length % 12 === 0 && (
          <Button onClick={this.loadMore} />
        )}
      </Box>
    );
  }
}
