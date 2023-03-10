import { useState, useEffect } from 'react';
import { fetchTtnStatus } from '../../../services/nova-poshta-api';

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

    return <div>
        <p>Статус: { deliveryData.Status }</p>
        <p>Відправник: { deliveryData.WarehouseSender }</p>
        <p>Одержувач: { deliveryData.WarehouseRecipient }</p>
    </div>
}

export default DeliveryStatus;