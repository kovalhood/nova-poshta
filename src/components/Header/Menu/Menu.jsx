import Navigation from '../Navigation';

export default function AuthMenu() {
    return <>
        <Navigation link={'/ttn-check'} title={'Перевірити ТТН'} />
        <Navigation link={'/branches'} title={'Список відділень'} />
    </>
}