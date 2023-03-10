import s from './InputTTn.module.scss';

const InputTtn = ({ name, onTtnChange, onKeyPress}) => {
  return <input
    type="number"
    name="ttn"
    className={s.input_field}
    placeholder="Введіть номер ТТН"
    value={name}
    onKeyDown = {onKeyPress}
    onChange={onTtnChange}
  />
}

export default InputTtn;