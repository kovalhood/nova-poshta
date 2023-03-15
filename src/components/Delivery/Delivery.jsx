import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-loading-skeleton/dist/skeleton.css'
import { getSearches } from '../../redux/searches/searches-selectors';
import actions from '../../redux/searches/searches-actions';
import SearchForm from "./SearchForm/SearchForm";
import DeliveryStatus from './DeliveryStatus/DeliveryStatus';
import SearchHistory from './SearchHistory';
import s from './Delivery.module.scss';

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
        // Preventing multiple notifications appearance
        toast.dismiss();

        if (searchQuery.ttn === searchQueryValue.ttn) {
            setSearchQuery(searchQueryValue);
            return toast.error("Цей ТТН вже відображено. Введіть новий пошуковий запит");
        }
        
        if (searchQueryValue.ttn !== '') {
            handleSearchInfo(searchQueryValue);
        }
        
        setSearchQuery(searchQueryValue);
    }

    useEffect(() => {
        if (searches.length===0) {
            setSearchQuery({ ttn: '' });
        };
    }, [searches]);

    return <>
        <SearchForm onQuerySearch={handleSearchQuery} historyQuery={ searchQuery } />
        <div className={s.info_wrapper}>
            
            {searchQuery.ttn === ''
                ? <></>
                : <DeliveryStatus searchQuery={searchQuery} />
                }
            
            {searches.length === 0
                ? <></>
                : <SearchHistory searchQuery={handleSearchQuery} />
                }
            
        </div>
    </>
}

export default Delivery;