import { Box } from '../Box';
import { Hearts } from 'react-loader-spinner';

const Loader = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Hearts
        height="80"
        width="100"
        color="#3f51b5"
        ariaLabel="hearts-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </Box>
  );
};

export default Loader;
