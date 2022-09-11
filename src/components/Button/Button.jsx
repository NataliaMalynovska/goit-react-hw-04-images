import PropTypes from 'prop-types';
import { Box } from '../Box';
import { Btn } from './Button.styled';

const Button = ({ onClick }) => {
  return (
    <Box p="16px" textAlign="center">
      <Btn type="button" onClick={onClick}>
        Load more
      </Btn>
    </Box>
  );
};
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default Button;
