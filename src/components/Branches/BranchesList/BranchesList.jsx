import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetchBranchesList } from '../../../services/nova-poshta-api';
import WeekSchedule from './WeekSchedule';
import Location from './Location';
import BranchSkeleton from './BranchSkeleton/BranchSkeleton';
import LoadMore from './LoadMore';
import s from './BranchesList.module.scss';

const BranchesList = ({searchQuery}) => {
    const [branchesData, setBranchesData] = useState([]);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState('idle');
    const [city, setCity] = useState('');
    const [warehouse, setWarehouse] = useState('');
    const [results, setResults] = useState('');
    
    const handleLoadMore = () => {
        setPage(prevState => prevState + 1);
    }

    useEffect(() => {
        if (searchQuery.city === '') {
            return;
        }

        if (city !== searchQuery.city && page > 1) {
            setBranchesData([]);
            setPage(1);
            return;
        }
        
        setStatus('pending');

        fetchBranchesList(searchQuery.city.trim(), searchQuery.warehouse, page, searchQuery.cityRef).then(res => res.data).then(data => {
            setResults(data.length);
            
            if (searchQuery.warehouse !== '' && page > 1) {
                setPage(1);
                return;
            }

            if (data.length === 0 && searchQuery.warehouse !== '') {
                setBranchesData([]);
                setStatus('resolved');
                setPage(1);
                return toast.error('Такого відділення не існує');
            }

            if (data.length === 0 && searchQuery.city !== '' && searchQuery.warehouse === '') {
                setBranchesData([]);
                setStatus('resolved');
                setPage(1);
                return toast.error('В вашому місті ще немає Нової Пошти');
            }

            if (page === 1) {
                setBranchesData(data);
                setStatus('resolved');
                return;
            }

            if (page > 1) {
                setBranchesData(prevState => [...prevState, ...data]);
                setStatus('resolved');
            }
        });

        setCity(searchQuery.city);
        setWarehouse(searchQuery.warehouse);
    }, [searchQuery, page]);

    // Loading if you have previous results showed
    if (status === 'pending' && searchQuery.warehouse === '' && page > 1) {
        return <ul className={s.branches}>
            {
                <>
                    {branchesData.map(({ SiteKey, CategoryOfWarehouse, WarehouseIndex, ShortAddress, Number, Schedule, TotalMaxWeightAllowed, PlaceMaxWeightAllowed }) => (
                        <li key={SiteKey} className={s.branches__item}>
                            <div>
                                <div className={s.branches__title}>
                                    {CategoryOfWarehouse === "Postomat"
                                        ? <><h3>Поштомат №{ Number },</h3><span className={s.branches__weight}>&nbsp;до {TotalMaxWeightAllowed > 0 ? TotalMaxWeightAllowed : PlaceMaxWeightAllowed} кг</span></>
                                        : <><h3>Відділення №{ Number },</h3><span className={s.branches__weight}>&nbsp;до {TotalMaxWeightAllowed > 0 ? TotalMaxWeightAllowed : PlaceMaxWeightAllowed} кг</span></>
                                    }
                                    
                                </div>
                                <p className={s.branches__index}>Індекс { WarehouseIndex }</p>
                                <p className={s.branches__address}>{ ShortAddress }</p>
                            </div>
                            
                            <WeekSchedule schedule={Schedule} />
                            <Location address={ShortAddress} />
                        </li>
                    ))}
                    <BranchSkeleton amountOfCards={ [1, 2, 3, 4, 5, 6] }/>
                </>
            }
        </ul>
    }

    // Skeleton if searching multiple branches (only city name in input fields)
    if (status === 'pending' && page===1 && searchQuery.warehouse === '') {
        return <ul className={s.branches}>
            <BranchSkeleton amountOfCards={[1, 2, 3, 4, 5, 6]} />
        </ul>
    }

    // Skeleton if searching for one branch (with city and number of warehouse in input fields)
    if (status === 'pending' && searchQuery.warehouse !== '') {
        return <ul className={s.branches}>
            <BranchSkeleton amountOfCards={[1]} />
        </ul>
    }

    // Resolved with nothing to load anymore
    if (status === 'resolved' && results !== 60) {
        return <ul className={s.branches}>
            {
                <>
                    {branchesData.map(({ SiteKey, CategoryOfWarehouse, WarehouseIndex, ShortAddress, Number, Schedule, TotalMaxWeightAllowed, PlaceMaxWeightAllowed }) => (
                        <li key={SiteKey} className={s.branches__item}>
                            <div>
                                <div className={s.branches__title}>
                                    {CategoryOfWarehouse === "Postomat"
                                        ? <><h3>Поштомат №{ Number },</h3><span className={s.branches__weight}>&nbsp;до {TotalMaxWeightAllowed > 0 ? TotalMaxWeightAllowed : PlaceMaxWeightAllowed} кг</span></>
                                        : <><h3>Відділення №{ Number },</h3><span className={s.branches__weight}>&nbsp;до {TotalMaxWeightAllowed > 0 ? TotalMaxWeightAllowed : PlaceMaxWeightAllowed} кг</span></>
                                    }
                                    
                                </div>
                                <p className={s.branches__index}>Індекс { WarehouseIndex }</p>
                                <p className={s.branches__address}>{ ShortAddress }</p>
                            </div>
                            
                            <WeekSchedule schedule={Schedule}/>
                            <Location address={ShortAddress} />
                        </li>
                    ))}
                </>
            }
        </ul>
    }

    // Resolved with Load More button at the end
    if (status === 'resolved') {
        return <>
            <ul className={s.branches}>
                {branchesData.map(({ SiteKey, CategoryOfWarehouse, WarehouseIndex, ShortAddress, Number, Schedule, TotalMaxWeightAllowed, PlaceMaxWeightAllowed }) => (
                    <li key={SiteKey} className={s.branches__item}>
                        <div>
                            <div className={s.branches__title}>
                                {CategoryOfWarehouse === "Postomat"
                                    ? <><h3>Поштомат №{ Number },</h3><span className={s.branches__weight}>&nbsp;до {TotalMaxWeightAllowed > 0 ? TotalMaxWeightAllowed : PlaceMaxWeightAllowed} кг</span></>
                                    : <><h3>Відділення №{ Number },</h3><span className={s.branches__weight}>&nbsp;до {TotalMaxWeightAllowed > 0 ? TotalMaxWeightAllowed : PlaceMaxWeightAllowed} кг</span></>
                                }
                                
                            </div>
                            <p className={s.branches__index}>Індекс { WarehouseIndex }</p>
                            <p className={s.branches__address}>{ ShortAddress }</p>
                        </div>
                        
                        <WeekSchedule schedule={Schedule}/>
                        <Location address={ShortAddress} />
                    </li>
                ))}
            </ul>
            <LoadMore text={'Завантажити більше'} loadMoreClick={handleLoadMore} />
        </>
    }
}

export default BranchesList;