import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSearches } from '../../../redux/searches/searches-selectors';
import InputTtn from './InputTtn';
import Button from '../../Button';

const SearchForm = (props) => {
    const [form, setForm] = useState({ ttn: '' });

    const searches = useSelector(getSearches);
    const dispatch = useDispatch();

    

    // Creating handler for our TTN field
    const handleTtnChange = event => {
        const { name, value } = event.currentTarget;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    }

    useEffect(() => {
        if (form.ttn !== props.historyQuery.ttn) {
            setForm(props.historyQuery);
        };
    }, [props.historyQuery]);


    // Creating submit handler
    const handleSubmit = event => {
        event.preventDefault();

        // After success happens this
        // handleSearchInfo();        
        props.onQuerySearch(form);
    };
    
    return <form onSubmit={handleSubmit}>
        <p>20400322248632</p>
        <InputTtn name={form.ttn} onTtnChange={handleTtnChange}/>
            
        <Button type={'submit'} title={'Отримати статус ТТН'} />
    </form>
};

export default SearchForm;