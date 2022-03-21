import React, { useState } from 'react';

import './modal.component.css';

const Modal = (props) => {
    const data = props.props;
    const [modal, setModal] = useState(true);
    const toggleModal = () => {
        setModal(!modal);
    };
    if(modal){
        document.body.classList.add('active-modal');
    }else{
        document.body.classList.remove('active-modal');
    };
    return(
        <div>
            {modal && (
                <div className="modal">
                    <div 
                    onClick={toggleModal}
                    className="overlay"></div>
                    <div className="modal-content">
                        <p style={{"fontSize":"25px"}}>{ data.city }, { data.country }</p>
                        <p>{ (new Date()).toLocaleString() }</p>
                        <h1>{ data.temp } &#8451;</h1>
                        <p style={{"fontSize":"30px"}}><strong>{ data.main }</strong></p>
                        <button 
                        onClick={toggleModal}
                        className="close-modal">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
};

export default Modal;