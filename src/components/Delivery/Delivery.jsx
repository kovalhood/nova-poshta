import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSearches } from '../../redux/searches/searches-selectors';
import actions from '../../redux/searches/searches-actions';
import SearchForm from "./SearchForm/SearchForm";
import DeliveryStatus from './DeliveryStatus/DeliveryStatus';
import SearchHistory from './SearchHistory';

const Delivery = () => {
    const [searchQuery, setSearchQuery] = useState({ ttn: '' });

    const searches = useSelector(getSearches);
    const dispatch = useDispatch();

    // Function for setting contacts in store
    const handleSearchInfo = (searchInfo) => {
        if (searches.find(search => search.number === searchInfo.ttn)) {
            dispatch(actions.deleteSearchByName(searchInfo.ttn));
        }

        dispatch(actions.addSearch(searchInfo.ttn));
    };
    
    const handleSearchQuery = searchQueryValue => {
        if (searchQuery.ttn === searchQueryValue.ttn) {
            return console.log("Input new search query.");
        }
        
        if (searchQuery.ttn !== '') {
            handleSearchInfo(searchQueryValue);
        }

        setSearchQuery(searchQueryValue);
    }

    return <div>
        <SearchForm onQuerySearch={handleSearchQuery} historyQuery={ searchQuery } />
        <DeliveryStatus searchQuery={searchQuery} />
        <SearchHistory searchQuery={handleSearchQuery} />
        
    </div>
}

export default Delivery;