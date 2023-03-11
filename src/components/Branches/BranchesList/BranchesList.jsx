import { useState, useEffect } from 'react';
import { fetchBranchesList } from '../../../services/nova-poshta-api';
import sprite from '../../../images/icons.svg';
import { toast } from 'react-toastify';
import BranchSkeleton from './BranchSkeleton/BranchSkeleton';
import s from './BranchesList.module.scss';

const BranchesList = ({searchQuery}) => {
    const [branchesData, setBranchesData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentDate, setCurrentdate] = useState(Date.now());

    useEffect(() => {
        if (searchQuery.city === '') {
            return;
        }

        setIsLoading(true);

        fetchBranchesList(searchQuery.city, searchQuery.warehouse).then(res => res.data).then(data => {
            console.log(data);
            setBranchesData(data);
            setIsLoading(false);
        });
            
    }, [searchQuery]);

    return <ul className={s.branches}>
        {
            isLoading === true
                ? <BranchSkeleton />
                : <>{ branchesData.map(({ SiteKey, CategoryOfWarehouse, WarehouseIndex, ShortAddress, Number, Schedule, TotalMaxWeightAllowed, PlaceMaxWeightAllowed}) => (
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

                        <div className={s.branches__schedule}>
                            {new Date(currentDate).getDay() === 0 && Schedule.Sunday !== '00:01-23:59'
                                ? <>{Schedule.Sunday.slice(6, 8) > new Date(currentDate).getHours() ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {Schedule.Sunday.slice(6, 11)}</p> : <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;чекаємо завтра з { Schedule.Monday.slice(0, 5) }</p> }</>
                                : <></>
                            }

                            {new Date(currentDate).getDay() === 1 && Schedule.Monday !== '00:01-23:59'
                                ? <>{Schedule.Monday.slice(6, 8) > new Date(currentDate).getHours() ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {Schedule.Monday.slice(6, 11)}</p> : <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;чекаємо завтра з { Schedule.Tuesday.slice(0, 5) }</p> }</>
                                : <></>
                            }

                            {new Date(currentDate).getDay() === 2 && Schedule.Tuesday !== '00:01-23:59'
                                ? <>{Schedule.Tuesday.slice(6, 8) > new Date(currentDate).getHours() ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {Schedule.Tuesday.slice(6, 11)}</p> : <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;чекаємо завтра з { Schedule.Wednesday.slice(0, 5) }</p> }</>
                                : <></>
                            }

                            {new Date(currentDate).getDay() === 3 && Schedule.Wednesday !== '00:01-23:59'
                                ? <>{Schedule.Wednesday.slice(6, 8) > new Date(currentDate).getHours() ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {Schedule.Wednesday.slice(6, 11)}</p> : <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;чекаємо завтра з { Schedule.Thursday.slice(0, 5) }</p> }</>
                                : <></>
                            }

                            {new Date(currentDate).getDay() === 4 && Schedule.Thursday !== '00:01-23:59'
                                ? <>{Schedule.Thursday.slice(6, 8) > new Date(currentDate).getHours() ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {Schedule.Thursday.slice(6, 11)}</p> : <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;чекаємо завтра з { Schedule.Friday.slice(0, 5) }</p> }</>
                                : <></>
                            }

                            {new Date(currentDate).getDay() === 5 && Schedule.Thursday !== '00:01-23:59'
                                ? <>{Schedule.Friday.slice(6, 8) > new Date(currentDate).getHours() ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {Schedule.Friday.slice(6, 11)}</p> : <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;чекаємо завтра з { Schedule.Saturday.slice(0, 5) }</p> }</>
                                : <></>
                            }
                            
                            {new Date(currentDate).getDay() === 6 && Schedule.Saturday !== '00:01-23:59'
                                ? <>{Schedule.Saturday.slice(6, 8) > new Date(currentDate).getHours() ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {Schedule.Saturday.slice(6, 11)}</p> : <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;чекаємо завтра з { Schedule.Sunday.slice(0, 5) }</p> }</>
                                : <></>
                            }

                            {Schedule.Sunday === '00:01-23:59' && Schedule.Monday === '00:01-23:59' && Schedule.Tuesday === '00:01-23:59' && Schedule.Wednesday === '00:01-23:59' && Schedule.Thursday === '00:01-23:59' && Schedule.Friday === '00:01-23:59' && Schedule.Saturday === '00:01-23:59'
                                ? <p className={s.branches__schedule_open}>Відчинено цілодобово</p>
                                : <></>
                            }
                        </div>

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

export default BranchesList;