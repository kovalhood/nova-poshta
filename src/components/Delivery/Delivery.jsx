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
    const handleSearchInfo = (searchHaha) => {
        if (searches.find(search => search.number === searchHaha.ttn)) {
            dispatch(actions.deleteSearchByName(searchHaha.ttn));
        }

        dispatch(actions.addSearch(searchHaha.ttn));
    };
    
    const handleSearchQuery = searchQueryValue => {
        if (searchQuery.ttn === searchQueryValue.ttn) {
            return console.log("Input new search query.");
        }
        console.log(searchQuery);
        console.log(searchQueryValue);
        
        setSearchQuery(searchQueryValue);
        handleSearchInfo(searchQueryValue);
    }

    return <div>
        <SearchForm onQuerySearch={handleSearchQuery} historyQuery={ searchQuery } />
        <DeliveryStatus searchQuery={searchQuery} />
        <SearchHistory searchQuery={handleSearchQuery} />
        
    </div>
}

export default Delivery;