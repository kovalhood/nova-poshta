import { NavLink } from "react-router-dom";

export default function Logo({link}) {
  return <NavLink to={link}>
    <p>Nova Poshta</p>
  </NavLink>
}