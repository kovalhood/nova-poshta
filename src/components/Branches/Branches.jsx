import { useState } from 'react';
import SearchBranches from "./SearchBranches/SearchBranches";
import BranchesList from './BranchesList';
import { toast } from 'react-toastify';

const Branches = () => {
    const [searchQuery, setSearchQuery] = useState({ city: '', warehouse: '', cityRef: '' });

    const handleBranchesSearch = searchQueryValue => {
        // Preventing multiple notifications appearance
        toast.dismiss();
        
        if (searchQuery.city === searchQueryValue.city && searchQuery.warehouse === searchQueryValue.warehouse && searchQuery.cityRef === searchQueryValue.cityRef) {
            setSearchQuery(searchQueryValue);
            return toast.error("Введіть нову назву міста або номер відділення");
        }
        
        setSearchQuery(searchQueryValue);
    }

    return <>
        <SearchBranches onQuerySearch={handleBranchesSearch} />
        <BranchesList searchQuery={ searchQuery } />
    </>
}

export default Branches;