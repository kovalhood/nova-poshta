import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getSearches } from '../../../redux/searches/searches-selectors';
import InputTtn from './InputTtn';
import sprite from '../../../images/icons.svg';
import { toast } from 'react-toastify';
import s from './SearchForm.module.scss';

const SearchForm = (props) => {
    const [form, setForm] = useState({ ttn: '' });

    const searches = useSelector(getSearches);

    // Creating handler for our TTN field
    const handleTtnChange = event => {
        const { name, value } = event.currentTarget;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    }

    // Avoiding symbols "e", "E", "+", "-", ".", "," in input fields
    const handleKeyPress = (event) => {
        ["e", "E", "+", "-", ".", ","].includes(event.key) && event.preventDefault();
    }

    useEffect(() => {
        if (searches.length!==0) {
            setForm({ ttn: searches[0].number });
            props.onQuerySearch({ ttn: searches[0].number });
        }
    }, []);

    useEffect(() => {
        if (form.ttn !== props.historyQuery.ttn) {
            setForm(props.historyQuery);
        };
    }, [props.historyQuery]);

    useEffect(() => {
        if (searches.length===0) {
            setForm({ ttn: '' });
        };
    }, [searches]);

    // Creating submit handler
    const handleSubmit = event => {
        event.preventDefault();

        if (form.ttn === '') {
            return toast.warning('Поле вводу не може бути пустим');
        }
        
        if (form.ttn.length < 14) {
            return toast.warning('Введено меньше ніж 14 цифр ТТН')
        }
        if (form.ttn.length > 14) {
            return toast.warning('Введено більше ніж 14 цифр ТТН')
        }
        // After success happens this
        // handleSearchInfo();        
        props.onQuerySearch(form);
    };

    const handleClearInput = event => {
        return setForm({ ttn: '' });
    }
    
    return <form onSubmit={handleSubmit} className={s.search_form}>
        
        <InputTtn name={form.ttn} onKeyPress={handleKeyPress} onTtnChange={handleTtnChange} />
        
        {form.ttn === '' ?
            <></>
            :
            <button type='button' className={s.clear_button} onClick={handleClearInput}>
                <svg className={s.clear_button__icon} width="20" height="20">
                    <use href={`${sprite}#clear`}></use>
                </svg>
            </button>
        }
            
        <button onClick={(e) => e.currentTarget.blur()} type='submit' className={`${form.ttn !== '' ? s.search_button__enabled : s.search_button__disabled}`}>
            <svg className={s.search_button__icon} width="20" height="20">
                <use href={`${sprite}#search`}></use>
            </svg>
        </button>
    </form>
};

export default SearchForm;