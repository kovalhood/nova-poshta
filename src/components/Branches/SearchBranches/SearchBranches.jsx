import { useState } from 'react';
import InputCity from './InputCity/InputCity';
import InputWarehouse from './InputWarehouse';
import sprite from '../../../images/icons.svg';
import { toast } from 'react-toastify';
import { fetchCitiesList } from '../../../services/nova-poshta-api';
import { nanoid } from 'nanoid'
import s from './SearchBranches.module.scss';

const SearchBranches = (props) => {
    const [form, setForm] = useState({ city: '', warehouse: '', cityRef: '' });
    const [citiesList, setCitiesList] = useState([]);

    // Creating handler for our city input field
    const handleFormChangeCity = event => {
        // Allowing only cyrillic symbols to be in the city input (and some special symbols)
        const gerex = /^[А-Яа-яа-щА-ЩЬьЮюЯяЇїІіЄєҐґ(\-)(\ )\u0027\u0060\u0022\u201C\u201D\u2018\u2019\u02BC]+$/;

        if(event.target.value.match(gerex) != null || event.target.value === ''){
            // Fetching dropdown menu with cities
            fetchCitiesList(event.target.value).then(res => res.data).then(data => {
                if (data[0].Addresses !== []) {
                    setCitiesList(data[0].Addresses);
                }

                if (data[0].Addresses === []) {
                    setCitiesList([]);
                }
                
            });
            
            const { name, value } = event.currentTarget;
            setForm(prevForm => ({ ...prevForm, [name]: value }));
        }

        setForm(prevForm => ({ ...prevForm, cityRef: '' }));
    }

    // Creating handler for our warehouse input field
    const handleFormChangeWarehouse = event => {
        if (event.target.value.length > 5) {
            // Preventing multiple notifications appearance
            toast.dismiss();

            toast.error('В поле вводу номеру відділення не можливо ввести більше 5 цифр');
            return;
        }

        // Allowing only numbers to be pasted
        if(event.target.value.match(/^[0-9]*$/) != null){
            const { name, value } = event.currentTarget;
            setForm(prevForm => ({ ...prevForm, [name]: value }));
        }
    }

    // Avoiding symbols "-", "ʼ", "`", "'", "ы", "Ы", "ъ", "Ъ", "э", "Э", "ё", "Ё" in input fields
    const handleKeyPressCity = (event) => {
        // Prevent russian language symbols 
        ["ы", "Ы", "ъ", "Ъ", "э", "Э", "ё", "Ё"].includes(event.key) && event.preventDefault();

        // Prevent this symbols to be at the start of sting and before 4 symbols will be written
        if (event.currentTarget.value === '' || event.currentTarget.value.length < 4) {
            ["-", "ʼ", "`", "'", " "].includes(event.key) && event.preventDefault();
        }
    }

    // Avoiding symbols "e", "E", "+", "-", ".", "," in input fields
    const handleKeyPressWarehouse = (event) => {
        if (event.currentTarget.value === '' && ['0'].includes(event.key)) {
            // Preventing multiple notifications appearance
            toast.dismiss();

            // Disallowing 0 to start the number of warehouse
            ['0'].includes(event.key) && event.preventDefault();
            toast.error('Номер відділення не може починатись з 0');
        }
        
        ["e", "E", "+", "-", ".", ","].includes(event.key) && event.preventDefault();
    }

    // Creating submit handler
    const handleSubmit = event => {
        event.preventDefault();

        // Preventing multiple notifications appearance
        toast.dismiss();

        if (form.city === '') {
            return toast.error('Поле вводу назви міста не може бути пустим');
        }

        if (form.city.length < 3 ) {
            return toast.error('Назва міста не може містити менше 3 літер');
        }

        if (form.city.length > 40 ) {
            return toast.error('Введена назва міста є занадто довгою');
        }

        // After success happens this
        // handleSearchInfo();        
        props.onQuerySearch(form);
        setCitiesList([]);
    };

    const onCityClick = (cityName, cityNameRef) => {
        setForm({ city: `${cityName}`, warehouse: '', cityRef: `${cityNameRef}` });
        setCitiesList([]);
    }

    const handleClearInput = event => {
        return setForm({ city: '' , warehouse: '', cityRef: ''});
    }

    return <form onSubmit={handleSubmit} className={s.search_form}>
        <InputCity name={form.city} onKeyPress={handleKeyPressCity} onCityChange={handleFormChangeCity} />
        <InputWarehouse name={form.warehouse} onKeyPress={handleKeyPressWarehouse} onWarehouseChange={handleFormChangeWarehouse} />

        {/* Dropdown menu with cities */}
        {(citiesList.length !== 0) ?
            <ul className={s.cities_list}>
                {citiesList.map(({ Present, MainDescription, DeliveryCity }) => (
                    <li key={nanoid(6)} className={s.cities_list__item} onClick={() => onCityClick(MainDescription, DeliveryCity)}>
                        <p>{Present}</p>
                    </li>
                ))}
            </ul>
            :
            <></>
        }
        
        {form.city === '' ?
            <span className={s.required_mark}></span>
            :
            <></>
        }
        
        {form.city === '' && form.warehouse === '' && form.cityRef === '' ?
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