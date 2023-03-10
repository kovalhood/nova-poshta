import Logo from './Logo';
import Menu from './Menu';
import s from './Header.module.scss';

export default function AppBar() {
    return <header className={s.header}>
        <div className={s.container}>
            <Logo link={'/'} />
            <Menu/>
        </div>
    </header>
}