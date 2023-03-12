const BASE_URL = 'https://api.novaposhta.ua/v2.0/json/';

async function fetchWithErrorHandling(url = '', config = {}) {
    // console.log(url);
    // console.log(config);
    const response = await fetch(url, config);
    
    return response.ok
        ? await response.json()
        : Promise.reject(new Error('Not found'));
}

export function fetchTtnStatus(ttnQuery) {
    const searchConfig = {
        method: 'POST',
        body: JSON.stringify({
            "apiKey": "beb71275173e0ee687757e3ac5981621",
            "modelName": "TrackingDocument",
            "calledMethod": "getStatusDocuments",
            "methodProperties": {
                "Documents": [
                    {
                        "DocumentNumber": `${ttnQuery}`
                    }
                ]
            }
        })
    };

    return fetchWithErrorHandling(`${BASE_URL}`, searchConfig);
}

export function fetchBranchesList(cityName, warehouseId, page) {
    const searchConfig = {
        method: 'POST',
        body: JSON.stringify(
            {
                "apiKey": "beb71275173e0ee687757e3ac5981621",
                "modelName": "Address",
                "calledMethod": "getWarehouses",
                "methodProperties": {
                "CityName" : `${cityName}`,
                // "CityRef" : "00000000-0000-0000-0000-000000000000",
                "Page" : `${page}`,
                "Limit" : "60",
                // "Language" : "UA",
                // "TypeOfWarehouseRef" : "00000000-0000-0000-0000-000000000000",
                "WarehouseId" : `${warehouseId}`
                }
            }
        )
    };

    return fetchWithErrorHandling(`${BASE_URL}`, searchConfig);
}