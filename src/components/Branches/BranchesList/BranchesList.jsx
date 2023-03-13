import { useState, useEffect } from 'react';
import { fetchBranchesList } from '../../../services/nova-poshta-api';
import sprite from '../../../images/icons.svg';
import { toast } from 'react-toastify';
import BranchSkeleton from './BranchSkeleton/BranchSkeleton';
import LoadMore from './LoadMore';
import s from './BranchesList.module.scss';

const BranchesList = ({searchQuery}) => {
    const [branchesData, setBranchesData] = useState([]);
    const [currentDate, setCurrentdate] = useState(Date.now());
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

        fetchBranchesList(searchQuery.city.trim(), searchQuery.warehouse, page).then(res => res.data).then(data => {
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
                return toast.error('В вашому місті ще немає Нової Пошти, або назва міста введена з помилкою');
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
                        
                        {/* Schedule dependencies for correct time of open/close display */}
                        <div className={s.branches__schedule}>
                            {new Date(currentDate).getDay() === 0 && Schedule.Sunday !== '00:01-23:59' && Schedule.Sunday.slice(0, 2) <= new Date(currentDate).getHours()
                                ? <>{Schedule.Sunday.slice(6, 8) > new Date(currentDate).getHours() ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {Schedule.Sunday.slice(6, 11)}</p> : <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Чекаємо завтра з { Schedule.Monday.slice(0, 5) }</p> }</>
                                : <></>
                            }

                            {new Date(currentDate).getDay() === 0 && Schedule.Sunday !== '00:01-23:59' && Schedule.Sunday.slice(0, 2) > new Date(currentDate).getHours()
                                ? <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Відкриється в { Schedule.Sunday.slice(0, 5) }</p>
                                : <></>
                            }

                            {new Date(currentDate).getDay() === 1 && Schedule.Monday !== '00:01-23:59' && Schedule.Monday.slice(0, 2) <= new Date(currentDate).getHours()
                                ? <>{Schedule.Monday.slice(6, 8) > new Date(currentDate).getHours() ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {Schedule.Monday.slice(6, 11)}</p> : <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Чекаємо завтра з { Schedule.Tuesday.slice(0, 5) }</p> }</>
                                : <></>
                            }

                            {new Date(currentDate).getDay() === 1 && Schedule.Monday !== '00:01-23:59' && Schedule.Monday.slice(0, 2) > new Date(currentDate).getHours()
                                ? <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Відкриється в { Schedule.Monday.slice(0, 5) }</p>
                                : <></>
                            }

                            {new Date(currentDate).getDay() === 2 && Schedule.Tuesday !== '00:01-23:59' && Schedule.Tuesday.slice(0, 2) <= new Date(currentDate).getHours()
                                ? <>{Schedule.Tuesday.slice(6, 8) > new Date(currentDate).getHours() ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {Schedule.Tuesday.slice(6, 11)}</p> : <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Чекаємо завтра з { Schedule.Wednesday.slice(0, 5) }</p> }</>
                                : <></>
                            }

                            {new Date(currentDate).getDay() === 2 && Schedule.Tuesday !== '00:01-23:59' && Schedule.Tuesday.slice(0, 2) > new Date(currentDate).getHours()
                                ? <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Відкриється в { Schedule.Tuesday.slice(0, 5) }</p>
                                : <></>
                            }

                            {new Date(currentDate).getDay() === 3 && Schedule.Wednesday !== '00:01-23:59' && Schedule.Wednesday.slice(0, 2) <= new Date(currentDate).getHours()
                                ? <>{Schedule.Wednesday.slice(6, 8) > new Date(currentDate).getHours() ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {Schedule.Wednesday.slice(6, 11)}</p> : <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Чекаємо завтра з { Schedule.Thursday.slice(0, 5) }</p> }</>
                                : <></>
                            }

                            {new Date(currentDate).getDay() === 3 && Schedule.Wednesday !== '00:01-23:59' && Schedule.Wednesday.slice(0, 2) > new Date(currentDate).getHours()
                                ? <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Відкриється в { Schedule.Wednesday.slice(0, 5) }</p>
                                : <></>
                            }

                            {new Date(currentDate).getDay() === 4 && Schedule.Thursday !== '00:01-23:59' && Schedule.Thursday.slice(0, 2) <= new Date(currentDate).getHours()
                                ? <>{Schedule.Thursday.slice(6, 8) > new Date(currentDate).getHours() ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {Schedule.Thursday.slice(6, 11)}</p> : <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Чекаємо завтра з { Schedule.Friday.slice(0, 5) }</p> }</>
                                : <></>
                            }

                            {new Date(currentDate).getDay() === 4 && Schedule.Thursday !== '00:01-23:59' && Schedule.Thursday.slice(0, 2) > new Date(currentDate).getHours()
                                ? <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Відкриється в { Schedule.Thursday.slice(0, 5) }</p>
                                : <></>
                            }

                            {new Date(currentDate).getDay() === 5 && Schedule.Friday !== '00:01-23:59' && Schedule.Friday.slice(0, 2) <= new Date(currentDate).getHours()
                                ? <>{Schedule.Friday.slice(6, 8) > new Date(currentDate).getHours() ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {Schedule.Friday.slice(6, 11)}</p> : <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Чекаємо завтра з { Schedule.Saturday.slice(0, 5) }</p> }</>
                                : <></>
                            }

                            {new Date(currentDate).getDay() === 5 && Schedule.Friday !== '00:01-23:59' && Schedule.Friday.slice(0, 2) > new Date(currentDate).getHours()
                                ? <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Відкриється в { Schedule.Friday.slice(0, 5) }</p>
                                : <></>
                            }

                            {new Date(currentDate).getDay() === 6 && Schedule.Saturday !== '00:01-23:59' && Schedule.Saturday.slice(0, 2) <= new Date(currentDate).getHours()
                                ? <>{Schedule.Saturday.slice(6, 8) > new Date(currentDate).getHours() ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {Schedule.Saturday.slice(6, 11)}</p> : <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Чекаємо завтра з { Schedule.Sunday.slice(0, 5) }</p> }</>
                                : <></>
                            }

                            {new Date(currentDate).getDay() === 6 && Schedule.Saturday !== '00:01-23:59' && Schedule.Saturday.slice(0, 2) > new Date(currentDate).getHours()
                                ? <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Відкриється в { Schedule.Saturday.slice(0, 5) }</p>
                                : <></>
                            }

                            {Schedule.Sunday === '00:01-23:59' && Schedule.Monday === '00:01-23:59' && Schedule.Tuesday === '00:01-23:59' && Schedule.Wednesday === '00:01-23:59' && Schedule.Thursday === '00:01-23:59' && Schedule.Friday === '00:01-23:59' && Schedule.Saturday === '00:01-23:59'
                                ? <p className={s.branches__schedule_open}>Відчинено цілодобово</p>
                                : <></>
                            }

                            {new Date(currentDate).getDay() === 0 && Schedule.Sunday === '00:01-23:59' && Schedule.Monday !== '00:01-23:59'
                                ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {Schedule.Sunday.slice(6, 11)}</p>
                                : <></>
                            }

                            {new Date(currentDate).getDay() === 0 && Schedule.Sunday === "-"
                                ? <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Чекаємо завтра з {Schedule.Monday.slice(0, 5)}</p>
                                : <></>
                            }
                        </div>

                        {/* Link to Google Maps with address of branch */}
                        <a
                            href={ `http://maps.google.com/maps?q=${ShortAddress.replace(/ /g,"+")}` }
                            target="_blank"
                            rel="noreferrer"
                            className={s.branches__map_link}
                        >
                            <svg className={s.branches__map_icon} width="24" height="24">
                                <use href={`${sprite}#location`}></use>
                            </svg>
                        </a>
                    </li>))
                }
            <BranchSkeleton amountOfCards={ [1, 2, 3, 4, 5, 6] }/>
        </>}
    </ul>
    }

    // Loading if searching multiple branches (only city name in input fields)
    if (status === 'pending' && page===1 && searchQuery.warehouse === '') {
        return <ul className={s.branches}>
        { <>
                <BranchSkeleton amountOfCards={ [1, 2, 3, 4, 5, 6] } />
            </>
        }
    </ul>
    }

    // Loading if searching for one branch (with city and number of warehouse in input fields)
    if (status === 'pending' && searchQuery.warehouse !== '') {
        return <ul className={s.branches}>
        { <>
                <BranchSkeleton amountOfCards={ [1] } />
            </>
        }
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
                            
                            {/* Schedule dependencies for correct time of open/close display */}
                            <div className={s.branches__schedule}>
                                {new Date(currentDate).getDay() === 0 && Schedule.Sunday !== '00:01-23:59' && Schedule.Sunday.slice(0, 2) <= new Date(currentDate).getHours()
                                    ? <>{Schedule.Sunday.slice(6, 8) > new Date(currentDate).getHours() ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {Schedule.Sunday.slice(6, 11)}</p> : <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Чекаємо завтра з { Schedule.Monday.slice(0, 5) }</p> }</>
                                    : <></>
                                }

                                {new Date(currentDate).getDay() === 0 && Schedule.Sunday !== '00:01-23:59' && Schedule.Sunday.slice(0, 2) > new Date(currentDate).getHours()
                                    ? <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Відкриється в { Schedule.Sunday.slice(0, 5) }</p>
                                    : <></>
                                }

                                {new Date(currentDate).getDay() === 1 && Schedule.Monday !== '00:01-23:59' && Schedule.Monday.slice(0, 2) <= new Date(currentDate).getHours()
                                    ? <>{Schedule.Monday.slice(6, 8) > new Date(currentDate).getHours() ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {Schedule.Monday.slice(6, 11)}</p> : <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Чекаємо завтра з { Schedule.Tuesday.slice(0, 5) }</p> }</>
                                    : <></>
                                }

                                {new Date(currentDate).getDay() === 1 && Schedule.Monday !== '00:01-23:59' && Schedule.Monday.slice(0, 2) > new Date(currentDate).getHours()
                                    ? <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Відкриється в { Schedule.Monday.slice(0, 5) }</p>
                                    : <></>
                                }

                                {new Date(currentDate).getDay() === 2 && Schedule.Tuesday !== '00:01-23:59' && Schedule.Tuesday.slice(0, 2) <= new Date(currentDate).getHours()
                                    ? <>{Schedule.Tuesday.slice(6, 8) > new Date(currentDate).getHours() ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {Schedule.Tuesday.slice(6, 11)}</p> : <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Чекаємо завтра з { Schedule.Wednesday.slice(0, 5) }</p> }</>
                                    : <></>
                                }

                                {new Date(currentDate).getDay() === 2 && Schedule.Tuesday !== '00:01-23:59' && Schedule.Tuesday.slice(0, 2) > new Date(currentDate).getHours()
                                    ? <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Відкриється в { Schedule.Tuesday.slice(0, 5) }</p>
                                    : <></>
                                }

                                {new Date(currentDate).getDay() === 3 && Schedule.Wednesday !== '00:01-23:59' && Schedule.Wednesday.slice(0, 2) <= new Date(currentDate).getHours()
                                    ? <>{Schedule.Wednesday.slice(6, 8) > new Date(currentDate).getHours() ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {Schedule.Wednesday.slice(6, 11)}</p> : <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Чекаємо завтра з { Schedule.Thursday.slice(0, 5) }</p> }</>
                                    : <></>
                                }

                                {new Date(currentDate).getDay() === 3 && Schedule.Wednesday !== '00:01-23:59' && Schedule.Wednesday.slice(0, 2) > new Date(currentDate).getHours()
                                    ? <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Відкриється в { Schedule.Wednesday.slice(0, 5) }</p>
                                    : <></>
                                }

                                {new Date(currentDate).getDay() === 4 && Schedule.Thursday !== '00:01-23:59' && Schedule.Thursday.slice(0, 2) <= new Date(currentDate).getHours()
                                    ? <>{Schedule.Thursday.slice(6, 8) > new Date(currentDate).getHours() ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {Schedule.Thursday.slice(6, 11)}</p> : <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Чекаємо завтра з { Schedule.Friday.slice(0, 5) }</p> }</>
                                    : <></>
                                }

                                {new Date(currentDate).getDay() === 4 && Schedule.Thursday !== '00:01-23:59' && Schedule.Thursday.slice(0, 2) > new Date(currentDate).getHours()
                                    ? <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Відкриється в { Schedule.Thursday.slice(0, 5) }</p>
                                    : <></>
                                }

                                {new Date(currentDate).getDay() === 5 && Schedule.Friday !== '00:01-23:59' && Schedule.Friday.slice(0, 2) <= new Date(currentDate).getHours()
                                    ? <>{Schedule.Friday.slice(6, 8) > new Date(currentDate).getHours() ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {Schedule.Friday.slice(6, 11)}</p> : <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Чекаємо завтра з { Schedule.Saturday.slice(0, 5) }</p> }</>
                                    : <></>
                                }

                                {new Date(currentDate).getDay() === 5 && Schedule.Friday !== '00:01-23:59' && Schedule.Friday.slice(0, 2) > new Date(currentDate).getHours()
                                    ? <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Відкриється в { Schedule.Friday.slice(0, 5) }</p>
                                    : <></>
                                }

                                {new Date(currentDate).getDay() === 6 && Schedule.Saturday !== '00:01-23:59' && Schedule.Saturday.slice(0, 2) <= new Date(currentDate).getHours()
                                    ? <>{Schedule.Saturday.slice(6, 8) > new Date(currentDate).getHours() ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {Schedule.Saturday.slice(6, 11)}</p> : <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Чекаємо завтра з { Schedule.Sunday.slice(0, 5) }</p> }</>
                                    : <></>
                                }

                                {new Date(currentDate).getDay() === 6 && Schedule.Saturday !== '00:01-23:59' && Schedule.Saturday.slice(0, 2) > new Date(currentDate).getHours()
                                    ? <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Відкриється в { Schedule.Saturday.slice(0, 5) }</p>
                                    : <></>
                                }

                                {Schedule.Sunday === '00:01-23:59' && Schedule.Monday === '00:01-23:59' && Schedule.Tuesday === '00:01-23:59' && Schedule.Wednesday === '00:01-23:59' && Schedule.Thursday === '00:01-23:59' && Schedule.Friday === '00:01-23:59' && Schedule.Saturday === '00:01-23:59'
                                    ? <p className={s.branches__schedule_open}>Відчинено цілодобово</p>
                                    : <></>
                                }

                                {new Date(currentDate).getDay() === 0 && Schedule.Sunday === '00:01-23:59' && Schedule.Monday !== '00:01-23:59'
                                    ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {Schedule.Sunday.slice(6, 11)}</p>
                                    : <></>
                                }

                                {new Date(currentDate).getDay() === 0 && Schedule.Sunday === "-"
                                    ? <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Чекаємо завтра з {Schedule.Monday.slice(0, 5)}</p>
                                    : <></>
                                }
                            </div>

                            {/* Link to Google Maps with address of branch */}
                            <a
                                href={ `http://maps.google.com/maps?q=${ShortAddress.replace(/ /g,"+")}` }
                                target="_blank"
                                rel="noreferrer"
                                className={s.branches__map_link}
                            >
                                <svg className={s.branches__map_icon} width="24" height="24">
                                    <use href={`${sprite}#location`}></use>
                                </svg>
                            </a>
                        </li>
                    ))
                }
            </>
        }
    </ul>
    }

    // Resolved with Load More button at the end
    if (status === 'resolved') {
        return <><ul className={s.branches}>
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
                            
                            {/* Schedule dependencies for correct time of open/close display */}
                            <div className={s.branches__schedule}>
                                {new Date(currentDate).getDay() === 0 && Schedule.Sunday !== '00:01-23:59' && Schedule.Sunday.slice(0, 2) <= new Date(currentDate).getHours()
                                    ? <>{Schedule.Sunday.slice(6, 8) > new Date(currentDate).getHours() ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {Schedule.Sunday.slice(6, 11)}</p> : <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Чекаємо завтра з { Schedule.Monday.slice(0, 5) }</p> }</>
                                    : <></>
                                }

                                {new Date(currentDate).getDay() === 0 && Schedule.Sunday !== '00:01-23:59' && Schedule.Sunday.slice(0, 2) > new Date(currentDate).getHours()
                                    ? <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Відкриється в { Schedule.Sunday.slice(0, 5) }</p>
                                    : <></>
                                }

                                {new Date(currentDate).getDay() === 1 && Schedule.Monday !== '00:01-23:59' && Schedule.Monday.slice(0, 2) <= new Date(currentDate).getHours()
                                    ? <>{Schedule.Monday.slice(6, 8) > new Date(currentDate).getHours() ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {Schedule.Monday.slice(6, 11)}</p> : <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Чекаємо завтра з { Schedule.Tuesday.slice(0, 5) }</p> }</>
                                    : <></>
                                }

                                {new Date(currentDate).getDay() === 1 && Schedule.Monday !== '00:01-23:59' && Schedule.Monday.slice(0, 2) > new Date(currentDate).getHours()
                                    ? <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Відкриється в { Schedule.Monday.slice(0, 5) }</p>
                                    : <></>
                                }

                                {new Date(currentDate).getDay() === 2 && Schedule.Tuesday !== '00:01-23:59' && Schedule.Tuesday.slice(0, 2) <= new Date(currentDate).getHours()
                                    ? <>{Schedule.Tuesday.slice(6, 8) > new Date(currentDate).getHours() ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {Schedule.Tuesday.slice(6, 11)}</p> : <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Чекаємо завтра з { Schedule.Wednesday.slice(0, 5) }</p> }</>
                                    : <></>
                                }

                                {new Date(currentDate).getDay() === 2 && Schedule.Tuesday !== '00:01-23:59' && Schedule.Tuesday.slice(0, 2) > new Date(currentDate).getHours()
                                    ? <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Відкриється в { Schedule.Tuesday.slice(0, 5) }</p>
                                    : <></>
                                }

                                {new Date(currentDate).getDay() === 3 && Schedule.Wednesday !== '00:01-23:59' && Schedule.Wednesday.slice(0, 2) <= new Date(currentDate).getHours()
                                    ? <>{Schedule.Wednesday.slice(6, 8) > new Date(currentDate).getHours() ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {Schedule.Wednesday.slice(6, 11)}</p> : <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Чекаємо завтра з { Schedule.Thursday.slice(0, 5) }</p> }</>
                                    : <></>
                                }

                                {new Date(currentDate).getDay() === 3 && Schedule.Wednesday !== '00:01-23:59' && Schedule.Wednesday.slice(0, 2) > new Date(currentDate).getHours()
                                    ? <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Відкриється в { Schedule.Wednesday.slice(0, 5) }</p>
                                    : <></>
                                }

                                {new Date(currentDate).getDay() === 4 && Schedule.Thursday !== '00:01-23:59' && Schedule.Thursday.slice(0, 2) <= new Date(currentDate).getHours()
                                    ? <>{Schedule.Thursday.slice(6, 8) > new Date(currentDate).getHours() ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {Schedule.Thursday.slice(6, 11)}</p> : <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Чекаємо завтра з { Schedule.Friday.slice(0, 5) }</p> }</>
                                    : <></>
                                }

                                {new Date(currentDate).getDay() === 4 && Schedule.Thursday !== '00:01-23:59' && Schedule.Thursday.slice(0, 2) > new Date(currentDate).getHours()
                                    ? <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Відкриється в { Schedule.Thursday.slice(0, 5) }</p>
                                    : <></>
                                }

                                {new Date(currentDate).getDay() === 5 && Schedule.Friday !== '00:01-23:59' && Schedule.Friday.slice(0, 2) <= new Date(currentDate).getHours()
                                    ? <>{Schedule.Friday.slice(6, 8) > new Date(currentDate).getHours() ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {Schedule.Friday.slice(6, 11)}</p> : <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Чекаємо завтра з { Schedule.Saturday.slice(0, 5) }</p> }</>
                                    : <></>
                                }

                                {new Date(currentDate).getDay() === 5 && Schedule.Friday !== '00:01-23:59' && Schedule.Friday.slice(0, 2) > new Date(currentDate).getHours()
                                    ? <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Відкриється в { Schedule.Friday.slice(0, 5) }</p>
                                    : <></>
                                }

                                {new Date(currentDate).getDay() === 6 && Schedule.Saturday !== '00:01-23:59' && Schedule.Saturday.slice(0, 2) <= new Date(currentDate).getHours()
                                    ? <>{Schedule.Saturday.slice(6, 8) > new Date(currentDate).getHours() ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {Schedule.Saturday.slice(6, 11)}</p> : <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Чекаємо завтра з { Schedule.Sunday.slice(0, 5) }</p> }</>
                                    : <></>
                                }

                                {new Date(currentDate).getDay() === 6 && Schedule.Saturday !== '00:01-23:59' && Schedule.Saturday.slice(0, 2) > new Date(currentDate).getHours()
                                    ? <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Відкриється в { Schedule.Saturday.slice(0, 5) }</p>
                                    : <></>
                                }

                                {Schedule.Sunday === '00:01-23:59' && Schedule.Monday === '00:01-23:59' && Schedule.Tuesday === '00:01-23:59' && Schedule.Wednesday === '00:01-23:59' && Schedule.Thursday === '00:01-23:59' && Schedule.Friday === '00:01-23:59' && Schedule.Saturday === '00:01-23:59'
                                    ? <p className={s.branches__schedule_open}>Відчинено цілодобово</p>
                                    : <></>
                                }

                                {new Date(currentDate).getDay() === 0 && Schedule.Sunday === '00:01-23:59' && Schedule.Monday !== '00:01-23:59'
                                    ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {Schedule.Sunday.slice(6, 11)}</p>
                                    : <></>
                                }

                                {new Date(currentDate).getDay() === 0 && Schedule.Sunday === "-"
                                    ? <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Чекаємо завтра з {Schedule.Monday.slice(0, 5)}</p>
                                    : <></>
                                }
                            </div>

                            {/* Link to Google Maps with address of branch */}
                            <a
                                href={ `http://maps.google.com/maps?q=${ShortAddress.replace(/ /g,"+")}` }
                                target="_blank"
                                rel="noreferrer"
                                className={s.branches__map_link}
                            >
                                <svg className={s.branches__map_icon} width="24" height="24">
                                    <use href={`${sprite}#location`}></use>
                                </svg>
                            </a>
                        </li>
                    ))
                }
            </>
        }
    </ul>
        <LoadMore text={'Завантажити більше'} loadMoreClick={ handleLoadMore } />
    </>
    }
}

export default BranchesList;