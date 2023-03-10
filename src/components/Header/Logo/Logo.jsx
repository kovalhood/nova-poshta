import { NavLink } from "react-router-dom";
import sprite from '../../../images/icons.svg';
import s from './Logo.module.scss';

export default function Logo({link}) {
  return <NavLink to={link} className={s.logo}>
    <svg className={s.logo_icon} width="40" height="40">
      <use href={`${sprite}#logo`}></use>
    </svg>
    <p className={s.logo__text}>Нова Пошта</p>
  </NavLink>
}