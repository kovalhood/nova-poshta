import { useState, useEffect } from 'react';
import { fetchBranchesList } from '../../../services/nova-poshta-api';
import sprite from '../../../images/icons.svg';
import { toast } from 'react-toastify';

const BranchesList = ({searchQuery}) => {
    const [branchesData, setBranchesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (searchQuery.city === '') {
            return;
        }
        console.log(searchQuery)

        fetchBranchesList(searchQuery.city, searchQuery.warehouse).then(res => res.data).then(data => {
            console.log(data);
            setBranchesData(data);
            setIsLoading(false);
        });
            
    }, [searchQuery]);

    return <ul>
            {
                branchesData.map(({ SiteKey, ShortAddress, Number, Schedule, PlaceMaxWeightAllowed}) => (
                    <li key={SiteKey}>
                        <div>
                            <p>{ ShortAddress }</p>
                        </div>
                        <div>
                            <p>{ Number }</p>
                        </div>
                        <div>
                            <p>{ Schedule.Friday }</p>
                        </div>
                        <div>
                            <p>{ PlaceMaxWeightAllowed }</p>
                        </div>

                    </li>
                ))
            }
        </ul>
}

export default BranchesList;