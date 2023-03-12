import Skeleton from 'react-loading-skeleton';
import s from './BranchSkeleton.module.scss';

const BranchSkeleton = ({amountOfCards}) => {

    return <>
        {
            amountOfCards.map((item) => (
                <li key={item} className={s.branches__item}>
                    <div className={s.branches__title}>
                        <Skeleton count={1} width={220} />

                        <div className={s.branches__index}>
                            <Skeleton count={1} width={170} />
                        </div>
                        
                        <div className={s.branches__address}>
                            <Skeleton count={1} width={250} />
                        </div>
                    </div>
                    
                    <div className={s.branches__schedule}>
                        <Skeleton count={1} width={200} />
                    </div>
                </li>
            ))
        }
    </>
}

export default BranchSkeleton;