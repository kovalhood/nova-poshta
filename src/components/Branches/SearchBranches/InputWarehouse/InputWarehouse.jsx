import s from './InputWarehouse.module.scss';

const InputWarehouse = ({ name, onWarehouseChange, onKeyPress }) => {
  return <input
    type="number"
    name="warehouse"
    placeholder="№ Відділення"
    className={s.input_field}
    value={name}
    onKeyDown = {onKeyPress}
    onChange={onWarehouseChange}
  />
}

export default InputWarehouse;