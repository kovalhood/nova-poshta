import { useState } from 'react';
import SearchForm from "./SearchForm/SearchForm";
import DeliveryStatus from './DeliveryStatus/DeliveryStatus';

const Delivery = () => {
    const [searchQuery, setSearchQuery] = useState({ ttn: '' });

    const handleSearchQuery = searchQueryValue => {
        if (searchQuery === searchQueryValue) {
            return console.log("Input new search query.");
        }

        setSearchQuery(searchQueryValue);
    }

    return <div>
        <SearchForm onQuerySearch = { handleSearchQuery } />
        <DeliveryStatus searchQuery = { searchQuery } />
    </div>
}

export default Delivery;