import React, {useEffect, useState} from 'react';
import axios from 'axios';

import TableRow from './tableRow.component.js';

import './table.component.css';


const fetchData = async (city) => {
    let url = `http://j-weather-api.herokuapp.com/api/v1/info/city-data/${city}`;
    const  response  = await axios.get(url);
    const resp = response.data;
    console.log(resp);
    return {
        city: resp.city,
        country: resp.country,
        humidity: resp.humidity,
        temperature: resp.temp,
        icon: resp.icon,
        wind_speed: resp.wind_speed,
        main: resp.main,
        timezone: resp.timezone
    }
}



const Table = () => {
    
    const [loading, setLoading] = useState(false);
    const [cities, setCities] = useState([]);
    const selectedCities = ['London', 'Lagos', 'Accra', 'Belhi', 'Ontario', 
                    'Toronto', 'Edinburgh', 'Birmingham',
                    'Chicago', 'Philadelphia', 'Vancouver', 'Paris', 
                    'Belfast', 'Pittsburgh', 'Bombay']  

    useEffect(() => {
        const fetchCities = async () => {
            const citiesData = await Promise.all(
                selectedCities.map(fetchData),
            )
            setCities([]);
            setCities(prevState => prevState.concat(citiesData));
            setLoading(false);
        }
        fetchCities();
    }, []);
    
    return(
        <div className='table'>
            <table className='center'>
                <tbody>
                    <tr>
                        <th className='width-head'>City</th>
                        <th className='width-head'>Temperature</th>
                        <th className='width-head'>desc</th>
                        <th className='width-icon'>Icon</th>
                    </tr>
                    {!loading ? 
                        (   cities.map((data, i) => <TableRow propsData={ data } key = {i} /> )  ) 
                        : 
                        (
                            <tr>
                                <td>city</td>
                                <td>country</td>
                                <td>country</td>
                                <td>country</td>
                                <td>country</td>
                            </tr> 
                        ) 
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table;