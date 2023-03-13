import { useState } from 'react';
import InputCity from './InputCity/InputCity';
import InputWarehouse from './InputWarehouse';
import sprite from '../../../images/icons.svg';
import { toast } from 'react-toastify';
import s from './SearchBranches.module.scss';

const SearchBranches = (props) => {
    const [form, setForm] = useState({ city: '' , warehouse: ''});

    // Creating handler for our city input field
    const handleFormChangeCity = event => {
        // Allowing only cyrillic symbols to be in the city input (and some special symbols)
        const gerex = /^[А-Яа-яа-щА-ЩЬьЮюЯяЇїІіЄєҐґ(\-)(\ )\u0027\u0060\u0022\u201C\u201D\u2018\u2019\u02BC]+$/;

        if(event.target.value.match(gerex) != null || event.target.value === ''){
            const { name, value } = event.currentTarget;
            setForm(prevForm => ({ ...prevForm, [name]: value }));
        }
    }

    // Creating handler for our warehouse input field
    const handleFormChangeWarehouse = event => {
        // Allowing only numbers to be pasted
        if(event.target.value.match(/^[0-9]*$/) != null){
            const { name, value } = event.currentTarget;
            setForm(prevForm => ({ ...prevForm, [name]: value }));
        }
    }

    // Avoiding symbols "-", "ʼ", "`", "'", "ы", "ъ", "э", "ё" in input fields
    const handleKeyPressCity = (event) => {
        // Prevent russian language symbols 
        // (have to write it as a rule, because otherwise on mobile devices it allows to write this symbols at the beginning of the string )
        if (event.currentTarget.value === '' || event.currentTarget.value.length > 0) {
            ["ы", "ъ", "э", "ё"].includes(event.key) && event.preventDefault();
        }

        // Prevent this symbols to be at the start of sting and before 4 symbols will be written
        if (event.currentTarget.value === '' || event.currentTarget.value.length < 4) {
            ["-", "ʼ", "`", "'", " "].includes(event.key) && event.preventDefault();
        }
    }

    // Avoiding symbols "e", "E", "+", "-", ".", "," in input fields
    const handleKeyPressWarehouse = (event) => {
        if (event.currentTarget.value === '') {
            // Disallowing 0 to start the number of warehouse
            ['0'].includes(event.key) && event.preventDefault();
        }

        if (event.currentTarget.value.length >= 6 ) {
            ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(event.key) && event.preventDefault();
        }
        
        ["e", "E", "+", "-", ".", ","].includes(event.key) && event.preventDefault();
    }

    // Creating submit handler
    const handleSubmit = event => {
        event.preventDefault();

        if (form.city === '') {
            return toast.error('Поле вводу назви міста не може бути пустим');
        }

        if (form.city.length < 3 ) {
            return toast.error('Назва міста не може містити менше 2 літер');
        }

        if (form.city.length > 20 ) {
            return toast.error('Введена назва міста є занадто довгою');
        }

        // After success happens this
        // handleSearchInfo();        
        props.onQuerySearch(form);
    };

    const handleClearInput = event => {
        return setForm({ city: '' , warehouse: ''});
    }

    return <form onSubmit={handleSubmit} className={s.search_form}>
        <InputCity name={form.city} onKeyPress={handleKeyPressCity} onCityChange={handleFormChangeCity} />
        <InputWarehouse name={form.warehouse} onKeyPress={handleKeyPressWarehouse} onWarehouseChange={handleFormChangeWarehouse} />
        
        {form.city === '' ?
            <span className={s.required_mark}></span>
            :
            <></>
        }
        
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