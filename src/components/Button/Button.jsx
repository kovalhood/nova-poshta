import PropTypes from 'prop-types';

const Button = ({type, title }) => {
  return <button type={type}>
    {title}
  </button>
}

// Button.propTypes = {
//   type: PropTypes.string,
//   title: PropTypes.string.isRequired
// }

export default Button;