import { useState, useEffect } from 'react';
import { fetchTtnStatus } from '../../../services/nova-poshta-api';
import s from './DeliveryStatus.module.scss';

const DeliveryStatus = ({searchQuery}) => {
    const [deliveryData, setDeliveryData] = useState([]);

    useEffect(() => {
        let ttnSearch = searchQuery.ttn;
        if (ttnSearch === '') {
            return;
        }

        fetchTtnStatus(ttnSearch).then(res => res.data).then(data => {
            setDeliveryData(data[0]);
        });
    }, [searchQuery.ttn])

    return <div className={s.status_wrapper}>
        <div>
            <div>
                <h3>Статус:</h3>
                <p>{deliveryData.Status}</p>
            </div>
        </div>
        <div>
            <div>
                <h3>Відправник:</h3>
                <p>{ deliveryData.WarehouseSender }</p>
            </div>
        </div>
        <div>
            <div>
                <h3>Одержувач:</h3>
                <p>{ deliveryData.WarehouseRecipient }</p>
            </div>
        </div>
    </div>
}

export default DeliveryStatus;