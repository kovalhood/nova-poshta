import Skeleton from 'react-loading-skeleton';
import sprite from '../../../../images/icons.svg';
import s from './StatusSkeleton.module.scss';

const StatusSkeleton = () => {
    return <>
            <div className={s.status__first_item}>
            <div className={s.status__icon_wrapper}>
                <svg className={s.status__icon} width="40" height="40">
                    <use href={`${sprite}#status`}></use>
                </svg>
            </div>
            <div>
                <h3 className={s.status__title}>Статус:</h3>
                <Skeleton count={1} width={170} />
                <Skeleton count={1} width={220} />
                <Skeleton count={1} width={150} />
            </div>
        </div>
        <div className={s.status__second_item}>
            <div className={s.status__icon_wrapper}>
                <svg className={s.status__icon} width="40" height="40">
                    <use href={`${sprite}#box`}></use>
                </svg>
            </div>
            <div>
                <h3 className={s.status__title}>Відправник:</h3>
                <Skeleton count={1} width={170} />
                <Skeleton count={1} width={220} />
                <Skeleton count={1} width={150} />
            </div>
            
        </div>
        <div>
            <svg className={s.status__icon_dots} width="26" height="26">
                <use href={`${sprite}#dots`}></use>
            </svg>
        </div>
        <div className={s.status__third_item}>
            <div className={s.status__icon_wrapper}>
                <svg className={s.status__icon} width="40" height="40">
                    <use href={`${sprite}#location`}></use>
                </svg>
            </div>
            <div>
                <h3 className={s.status__title}>Одержувач:</h3>
                <Skeleton count={1} width={170} />
                <Skeleton count={1} width={220} />
                <Skeleton count={1} width={150} />
            </div>
        </div>
    </>
}

export default StatusSkeleton;