const InputCity = ({ name, onCityChange}) => {
  return <input
    type="text"
    name="city"
    placeholder="Введіть назву міста"
    value={name}
    onChange={onCityChange}
  />
}

export default InputCity;