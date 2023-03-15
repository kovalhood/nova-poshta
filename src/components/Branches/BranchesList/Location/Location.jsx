import sprite from '../../../../images/icons.svg';
import s from './Location.module.scss';

const Location = ({ address }) => {
    {/* Link to Google Maps with address of branch */}
    return <a
        href={ `http://maps.google.com/maps?q=${address.replace(/ /g,"+")}` }
        target="_blank"
        rel="noreferrer"
        className={s.branches_location}
    >
        <svg className={s.branches_location__icon} width="24" height="24">
            <use href={`${sprite}#location`}></use>
        </svg>
    </a>
}

export default Location;