import s from './LoadMore.module.scss';

const LoadMore = ({text, loadMoreClick}) => {
    return <button className={s.load_more__button} type='button' onClick ={loadMoreClick}>{text}</button>
}

export default LoadMore;