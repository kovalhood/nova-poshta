import { NavLink } from "react-router-dom";
import s from './Navigation.module.scss';

const Navigation = ({link, title}) => {
    return <li className={s.menu__item}>
        <NavLink to={link} className={({isActive}) => isActive ? s.link__active : s.link} >{ title }</NavLink>
    </li>
}

export default Navigation;