import React, {useEffect, useState} from 'react';
import axios from 'axios';

import Loading from '../loading.components/loading.component.js';
import TableRow from './tableRow.component.js';

import './table.component.css';


const fetchData = async (city) => {
    // let url = `https://j-weather-api.herokuapp.com/api/v1/info/city-data/${city}`;
    let url = `http://127.0.0.1:4000/api/v1/info/city-data/${city}`;
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
    
    const [loading, setLoading] = useState(true);
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
            {!loading ? 
                (
                    <table className='center'>
                        <tbody>
                            <tr>
                                <th className='width-head'>City</th>
                                <th className='width-head'>Temperature</th>
                                <th className='width-head'>desc</th>
                                <th className='width-icon'>Icon</th>
                            </tr>
                            {(   cities.map((data, i) => <TableRow propsData={ data } key = {i} /> )  )}
                        </tbody>
                    </table>
                )
                : 
                (
                <div>
                    <div>
                    <table className='center'>
                        <tbody>
                            <tr>
                                <th className='width-head'>City</th>
                                <th className='width-head'>Temperature</th>
                                <th className='width-head'>desc</th>
                                <th className='width-icon'>Icon</th>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <Loading />
                </div>
                ) 
            }
        </div>
    )
}

export default Table;