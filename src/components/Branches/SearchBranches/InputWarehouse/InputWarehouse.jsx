const InputWarehouse = ({ name, onWarehouseChange, onKeyPress}) => {
  return <input
    type="number"
    name="warehouse"
    placeholder="Введіть номер відділення"
    value={name}
    onKeyDown = {onKeyPress}
    onChange={onWarehouseChange}
  />
}

export default InputWarehouse;