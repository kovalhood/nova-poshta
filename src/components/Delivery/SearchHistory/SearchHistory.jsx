import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../redux/searches/searches-actions';
import { getSearches } from '../../../redux/searches/searches-selectors';

const SearchHistory = ({searchQuery}) => {
    const searches = useSelector(getSearches);
    const dispatch = useDispatch();
    
    const handleDeleteAll = () => {
        dispatch(actions.deleteAll());
    }

    const handleHistorySearch = (historyNumber) => {
        let clickedTtn = { ttn: historyNumber };
        searchQuery(clickedTtn);
    }

    const handleDeleteSearch = (contactId) => {
        dispatch(actions.deleteSearchById(contactId));
    };
    
    return <>
        <button onClick={handleDeleteAll}>Очистити історію</button>
        {
            searches.map(({ number, id}) => (
                <li key={id}>
                    <a onClick={() => handleHistorySearch(number)}>{number}</a>
                    <button type='button'
                        onClick={() => handleDeleteSearch(id)}>
                        Видалити
                    </button>
                </li>
            ))
        }
        </>
}

export default SearchHistory;