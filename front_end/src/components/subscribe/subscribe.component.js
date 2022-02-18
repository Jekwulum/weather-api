import React, {useState} from "react";
import axios from "axios";

import './subscribe.component.css';


const Subscribe = () => {
    const [email, setEmail] = useState("");

    const submitHandler = async (event) => {
        event.preventDefault();
        // console.log(email);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            const response = await axios.post(
                'http://127.0.0.1:4000/api/v1/subscribers/new',
                {email},
                config
            );
            if(response){
                console.log(response.data);
                alert(response.data.message);
            }
            else{
                alert("no connection to server!")
            }
        } 
        catch (error) {
            if(error.response){
                alert(error.response.data.message);
                console.log(error.response.data);
            }
            
        }
    };

    return(
        <div className="sub">
            <input 
                type="email" 
                className="email-input" 
                placeholder="E-mail"
                onChange={(event) => setEmail(event.target.value)}  />
            <button 
                className="sub-btn" 
                onClick={submitHandler}>subscribe</button>
        </div>
    )
}

export default Subscribe;