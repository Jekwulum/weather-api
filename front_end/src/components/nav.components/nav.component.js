import React from 'react';
import Subscribe from '../subscribe/subscribe.component';
import './nav.component.css';

const Nav = () => {
    return(
        <div className='head'>
            <img className='app-icon' src={require('../../app-icon.png')} alt="" />
            <Subscribe />
        </div>
    )
}

export default Nav;