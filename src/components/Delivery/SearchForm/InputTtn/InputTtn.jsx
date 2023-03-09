import PropTypes from 'prop-types';

const InputTtn = ({ name, onTtnChange}) => {
  return <input
    type="number"
    name="ttn"
    placeholder='Введіть номер ТТН'
    value={name}
    onChange={onTtnChange}
  />
}

// InputTtn.propTypes = {
//   name: PropTypes.string.isRequired,
// }

export default InputTtn;