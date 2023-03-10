import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSearches } from '../../redux/searches/searches-selectors';
import actions from '../../redux/searches/searches-actions';
import SearchForm from "./SearchForm/SearchForm";
import DeliveryStatus from './DeliveryStatus/DeliveryStatus';
import SearchHistory from './SearchHistory';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
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
        if (searchQuery.ttn === searchQueryValue.ttn) {
            return console.log("Input new search query.");
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
        {/* <p>20400322248632</p> */}
        <SearchForm onQuerySearch={handleSearchQuery} historyQuery={ searchQuery } />
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <p>
            <Skeleton count={1} />
            </p>
        </SkeletonTheme>
        <div className={s.info_wrapper}>
            
            {searches.length === 0
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