import axios from "axios";
import React, {useState} from "react";

import Modal from "../modal.components/modal.component";

import './search.component.css';

const Search = () => {
    const [searchCity, setSearchCity] = useState('');
    const [cityInfo, setCityInfo] = useState('');
    const [modalLoading, setModalLoading] = useState(true);

    const handleSearch = async () => {
        // let url = `https://j-weather-api.herokuapp.com/api/v1/info/city-data/${city}`;
        if (searchCity === ''){
            alert("Enter a city");
        }
        else{
            // let url = `http://127.0.0.1:4000/api/v1/info/city-data/${searchCity}`;
            let url = `https://j-weather-api.herokuapp.com/api/v1/info/city-data/${searchCity}`;

            const response = await axios.get(url);
            if (response.data.status === 404){
                alert(response.data.message);
            }
            else if ( response.status === 200 ){
                if (response.data){
                    setModalLoading(true);
                    setCityInfo(response.data);
                    setModalLoading(false);
                }   
            }
        }
    };

    const onInputChange = (e) => {
        setSearchCity(e.target.value);
    };

    return(
        <div>
            <div className="search-comp">
                <input 
                    type="search" 
                    className="input-search"
                    placeholder="Enter city name"
                    onChange={ onInputChange } />

                <button 
                    className="search-btn"
                    onClick = { handleSearch }>
                    Get Info
                </button>
            </div>
            {!(modalLoading) && <div className="modal-active"><Modal props={ cityInfo }/></div>}
        </div>
    )
};


export default Search;