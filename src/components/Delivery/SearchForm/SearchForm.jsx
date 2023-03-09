import { useState } from 'react';
import InputTtn from './InputTtn';
import Button from '../../Button';

const SearchForm = (props) => {
    const [form, setForm] = useState({ ttn: '' });

    // Creating handler for our TTN field
    const handleTtnChange = event => {
        const { name, value } = event.currentTarget;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    }

    // Creating submit handler
    const handleSubmit = event => {
        event.preventDefault();
        // After success happens this
        props.onQuerySearch(form);
    };
    
    return <form onSubmit={handleSubmit}>
        <p>20400322248632</p>
        <InputTtn name={form.ttn} onTtnChange={handleTtnChange}/>
            
        <Button type={'submit'} title={'Отримати статус ТТН'} />
    </form>
};

export default SearchForm;