import Logo from './Logo';
import Menu from './Menu';

export default function AppBar() {
    return <header>
        <div>
            <Logo link={'/'} />
            <Menu/>
        </div>
    </header>
}