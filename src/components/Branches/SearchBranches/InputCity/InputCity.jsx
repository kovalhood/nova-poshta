import s from './InputCity.module.scss';

const InputCity = ({ name, onCityChange }) => {
  return <input
    type="text"
    name="city"
    placeholder="Назва міста"
    className={s.input_field}
    value={name}
    onChange={onCityChange}
  />
}

export default InputCity;