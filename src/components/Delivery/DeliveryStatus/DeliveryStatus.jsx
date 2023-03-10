import { useState, useEffect } from 'react';
import { fetchTtnStatus } from '../../../services/nova-poshta-api';
import StatusSkeleton from './StatusSkeleton';
import sprite from '../../../images/icons.svg';
import { toast } from 'react-toastify';
import { formattingStatusDate, formattingSenderDate, formattingRecipientDate } from '../../../services/formattingDateTime';
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
                {deliveryData.RecipientDateTime === '' || deliveryData.RecipientDateTime === undefined
                    ? <p className={s.status__date}>Час отримання: відсутній</p>
                    : <p className={s.status__date}>Час отримання: {formattingStatusDate(deliveryData.RecipientDateTime)}</p> }    
                
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
                {deliveryData.DateCreated === '' || deliveryData.DateCreated === undefined
                    ? <p className={s.status__date}>Час створення: відсутній</p>
                    : <p className={s.status__date}>Час створення: {formattingSenderDate(deliveryData.DateCreated)}</p> }
                
                {deliveryData.WarehouseSender === '' || deliveryData.WarehouseSender === undefined
                    ? <p className={s.status__state}>Інформація про відділення відсутня</p>
                    : <p className={s.status__state}>{ deliveryData.CitySender}, {deliveryData.WarehouseSender}</p>
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
                {deliveryData.AdjustedDate === undefined || deliveryData.ActualDeliveryDate === undefined
                    ? <p className={s.status__date}>Час прибуття: відсутній</p>
                    : <></>}
                
                {deliveryData.AdjustedDate === '' && deliveryData.ActualDeliveryDate === '' && deliveryData.AdjustedDate !== undefined
                    ? <p className={s.status__date}>Орієнтовний час прибуття: не розраховано</p>
                    : <></>}
                
                {deliveryData.AdjustedDate !== '' && deliveryData.ActualDeliveryDate === '' && deliveryData.AdjustedDate !== undefined
                    ? <p className={s.status__date}>Орієнтовний час прибуття: {formattingRecipientDate(deliveryData.AdjustedDate)}</p>
                    : <></>}
                        
                {deliveryData.AdjustedDate === '' && deliveryData.ActualDeliveryDate !== '' && deliveryData.ActualDeliveryDate !== undefined
                    ? <p className={s.status__date}>Час прибуття: {formattingRecipientDate(deliveryData.ActualDeliveryDate)}</p>
                    : <></>}
                        
                {deliveryData.AdjustedDate !== '' && deliveryData.ActualDeliveryDate !== '' && deliveryData.ActualDeliveryDate !== undefined
                    ? <p className={s.status__date}>Час прибуття: {formattingRecipientDate(deliveryData.ActualDeliveryDate)}</p>
                    : <></> }
                
                {deliveryData.WarehouseRecipient === '' || deliveryData.WarehouseSender === undefined
                    ? <p className={s.status__state}>Інформація про відділення відсутня</p>
                    : <p className={s.status__state}>{ deliveryData.CityRecipient}, {deliveryData.WarehouseRecipient}</p>
                }
            </div>
        </div></>
        }
        
    </div>
}

export default DeliveryStatus;