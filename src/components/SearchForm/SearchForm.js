import InputTtn from './InputTtn';
import Button from '../Button';

const SearchForm = () => {
    return <form>
        <InputTtn name={'НомерТТН'}/>
            
        <Button type={'submit'} title={'Отримати статус ТТН'} />
    </form>
};

export default SearchForm;