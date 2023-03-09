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
        <p>Відправлено: { deliveryData.WarehouseRecipient }</p>
        <p>Отримано: {deliveryData.WarehouseSender }</p>
    </div>
}

export default DeliveryStatus;