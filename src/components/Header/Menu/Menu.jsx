import Navigation from '../Navigation';
import s from './Menu.module.scss';

export default function AuthMenu() {
    return <nav>
        <ul className={s.menu}>
            <Navigation link={'/'} title={'Перевірити ТТН'} />
            <Navigation link={'/branches'} title={'Відділення'} />
        </ul>
    </nav>
}