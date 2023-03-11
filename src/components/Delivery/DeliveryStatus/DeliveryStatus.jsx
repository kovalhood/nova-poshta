import { useState, useEffect } from 'react';
import { fetchTtnStatus } from '../../../services/nova-poshta-api';
import StatusSkeleton from './StatusSkeleton';
import sprite from '../../../images/icons.svg';
import { toast } from 'react-toastify';
import s from './DeliveryStatus.module.scss';

const DeliveryStatus = ({searchQuery}) => {
    const [deliveryData, setDeliveryData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        
        let ttnSearch = searchQuery.ttn;
        if (ttnSearch === '') {
            return;;
        }
        
        fetchTtnStatus(ttnSearch).then(res => res.data).then(data => {
            if (data[0] === undefined) {
                setDeliveryData({ Status: undefined, WarehouseSender: undefined, WarehouseRecipient: undefined })
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);

                return toast.error("Доставки з таким ТТН не існує");
            }

            if (data[0].Status === 'Номер не найден') {
                setDeliveryData({ Status: undefined, WarehouseSender: undefined, WarehouseRecipient: undefined })
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);

                return toast.error("Доставки з таким ТТН не існує");
            }

            setDeliveryData(data[0]);
            setIsLoading(false);
        });
    }, [searchQuery.ttn]);

    return <div className={s.status_wrapper}>
        {isLoading === true
            ? <StatusSkeleton/>
            : <>
            <div className={s.status__first_item}>
            <div className={s.status__icon_wrapper}>
                <svg className={s.status__icon} width="40" height="40">
                    <use href={`${sprite}#status`}></use>
                </svg>
            </div>
            <div>
                <h3 className={s.status__title}>Статус:</h3>
                {deliveryData.Status === undefined || deliveryData.Status === 'Номер не найден'
                    ? <p className={s.status__state}>Номер не знайдено</p>
                    : <p className={s.status__state}>{deliveryData.Status}</p>
                }
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
                {deliveryData.WarehouseSender === ''|| deliveryData.WarehouseSender === undefined
                    ? <p className={s.status__state}>Інформація відсутня</p>
                    : <p className={s.status__state}>{deliveryData.WarehouseSender}</p>
                }
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
                {deliveryData.WarehouseRecipient === '' || deliveryData.WarehouseSender === undefined
                    ? <p className={s.status__state}>Інформація відсутня</p>
                    : <p className={s.status__state}>{deliveryData.WarehouseRecipient}</p>
                }
            </div>
        </div></>
        }
        
    </div>
}

export default DeliveryStatus;