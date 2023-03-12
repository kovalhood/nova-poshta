import s from './InputCity.module.scss';

const InputCity = ({ name, onCityChange, onKeyPress }) => {
  return <input
    type="text"
    name="city"
    placeholder="Назва міста"
    className={s.input_field}
    value={name}
    onKeyDown = {onKeyPress}
    onChange={onCityChange}
  />
}

export default InputCity;