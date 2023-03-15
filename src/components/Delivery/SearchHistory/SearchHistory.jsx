import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../redux/searches/searches-actions';
import { getSearches } from '../../../redux/searches/searches-selectors';
import sprite from '../../../images/icons.svg';
import s from './SearchHistory.module.scss';

const SearchHistory = ({searchQuery}) => {
    const searches = useSelector(getSearches);
    const dispatch = useDispatch();
    
    const handleDeleteAll = () => {
        dispatch(actions.deleteAll());
    }

    const handleHistorySearch = (event, historyNumber) => {
        event.currentTarget.blur();
        let clickedTtn = { ttn: historyNumber };
        searchQuery(clickedTtn);
    }

    const handleDeleteSearch = (contactId) => {
        dispatch(actions.deleteSearchById(contactId));
    };
    
    return <div className={s.history_wrapper}>
        <div className={s.history_header}>
            <p className={s.history_title}>Історія пошуку</p>
            <button className={s.clear_all} onClick={handleDeleteAll}>
                <svg className={s.clear_all__icon} width="20" height="20">
                    <use href={`${sprite}#trash`}></use>
                </svg>
            </button>
        </div>

        <ul className={s.history}>
            {
                searches.map(({ number, id, date}) => (
                    <li key={id} className={s.history__item}>
                        <div className={s.history__event} role='button' onClick={(event) => handleHistorySearch(event, number)}>
                            <p className={s.history__time}>{new Date(date).toLocaleString()}</p>
                            <a className={s.history__link}>{number}</a>
                        </div>

                        <button type='button' className={s.delete_button} onClick={() => handleDeleteSearch(id)}>
                            <svg className={s.delete_button__icon} width="18" height="18">
                                <use href={`${sprite}#clear`}></use>
                            </svg>
                        </button>
                    </li>
                ))
            }
        </ul>
    </div>
}

export default SearchHistory;