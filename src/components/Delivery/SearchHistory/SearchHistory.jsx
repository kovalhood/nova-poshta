import { useState, useEffect } from 'react';

const SearchHistory = ({searchQuery}) => {
    const [searchHistory, setSearchHistory] = useState([]);
    
    useEffect(() => {
        if (searchQuery.ttn === '') {
            return;
        }

        setSearchHistory(prevState => [...prevState, searchQuery]);
        
        console.log(searchHistory)
    }, [searchQuery])

    return (
      searchHistory.map(({ ttn, id}) => (
          <li  key={id}>
              <a>{ttn}</a>
        </li>
      ))
    )
}

export default SearchHistory;