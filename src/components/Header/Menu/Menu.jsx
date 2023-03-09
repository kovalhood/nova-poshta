import Navigation from '../Navigation';

export default function AuthMenu() {
    return <>
        <Navigation link={'/'} title={'Перевірити ТТН'} />
        <Navigation link={'/branches'} title={'Список відділень'} />
    </>
}