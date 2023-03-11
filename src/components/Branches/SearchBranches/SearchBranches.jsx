import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getSearches } from '../../../redux/searches/searches-selectors';
import InputCity from './InputCity/InputCity';
import InputWarehouse from './InputWarehouse';
import sprite from '../../../images/icons.svg';
import { toast } from 'react-toastify';
import s from './SearchBranches.module.scss';

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

    const handleClearInput = event => {
        return setForm({ city: '' , warehouse: ''});
    }

    return <form onSubmit={handleSubmit} className={s.search_form}>
        <InputCity name={form.city} onCityChange={handleFormChange} />
        <InputWarehouse name={form.warehouse} onKeyPress={handleKeyPress} onWarehouseChange={handleFormChange}/>
        
        {form.city === '' && form.warehouse === '' ?
            <></>
            :
            <button type='button' className={s.clear_button} onClick={handleClearInput}>
                <svg className={s.clear_button__icon} width="20" height="20">
                    <use href={`${sprite}#clear`}></use>
                </svg>
            </button>
        }

        <button onClick={(e) => e.currentTarget.blur()} type='submit' className={`${form.city !== '' ? s.search_button__enabled : s.search_button__disabled}`}>
            <svg className={s.search_button__icon} width="20" height="20">
                <use href={`${sprite}#search`}></use>
            </svg>
        </button>
    </form>
};

export default SearchBranches;