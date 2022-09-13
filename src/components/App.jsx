import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalStyle } from './GlobalStyle';
import { Box } from './Box';
import { fetchPhotos } from '../services/api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';

const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchData = async () => {
      try {
        setStatus('pending');
        const data = await fetchPhotos(query, page);
        const { hits, total } = data;

        if (total === 0 || (hits.length === 0 && hits.totalHits > 0)) {
          setStatus('idle');
          return;
        }
        setStatus('resolved');
        setHits(prevHits => [...prevHits, ...hits]);
        return;
      } catch (error) {
        setStatus('rejected');
      }
    };
    fetchData();
  }, [page, query]);

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setHits([]);
    setStatus('idle');
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

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
      <Searchbar onSubmit={handleFormSubmit} />
      {hits.length > 0 && <ImageGallery hits={hits} />}
      {status === 'pending' && <Loader />}
      {hits.length >= 12 && hits.length % 12 === 0 && (
        <Button onClick={loadMore} />
      )}
    </Box>
  );
};

export default App;
