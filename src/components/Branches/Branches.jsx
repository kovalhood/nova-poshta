import { useState, useEffect } from 'react';
import SearchBranches from "./SearchBranches/SearchBranches";
import BranchesList from './BranchesList';
import { toast } from 'react-toastify';

const Branches = () => {
    const [searchQuery, setSearchQuery] = useState({ city: '', warehouse: '' });

    const handleBranchesSearch = searchQueryValue => {
        if (searchQuery.city === searchQueryValue.city && searchQuery.warehouse === searchQueryValue.warehouse) {
            setSearchQuery(searchQueryValue);
            return toast.error("Цей ТТН вже відображено. Введіть новий пошуковий запит");
        }
        
        
        setSearchQuery(searchQueryValue);
    }

    return <> <SearchBranches onQuerySearch ={ handleBranchesSearch } />
        <BranchesList searchQuery={ searchQuery } />
    </>
}

export default Branches;