import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getSearches } from '../../../redux/searches/searches-selectors';
import sprite from '../../../images/icons.svg';
import { toast } from 'react-toastify';
import InputCity from './InputCity/InputCity';
import InputWarehouse from './InputWarehouse';

const SearchBranches = (props) => {
    const [form, setForm] = useState({ city: '' , warehouse: ''});

    // Creating handler for our field
    const handleFormChange = event => {
        const { name, value } = event.currentTarget;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    }

    // Avoiding symbols "e", "E", "+", "-", ".", "," in input fields
    const handleKeyPress = (event) => {
        ["e", "E", "+", "-", ".", ","].includes(event.key) && event.preventDefault();
    }

        // Creating submit handler
    const handleSubmit = event => {
        event.preventDefault();

        // After success happens this
        // handleSearchInfo();        
        props.onQuerySearch(form);
    };

    return <form onSubmit={handleSubmit}>
        <InputCity name={form.city} onCityChange={handleFormChange} />
        <InputWarehouse name={form.warehouse} onKeyPress={handleKeyPress} onWarehouseChange={handleFormChange}/>
        
        <button onClick={(e) => e.currentTarget.blur()} type='submit'>
            <svg width="20" height="20">
                <use href={`${sprite}#search`}></use>
            </svg>
        </button>
    </form>
};

export default SearchBranches;