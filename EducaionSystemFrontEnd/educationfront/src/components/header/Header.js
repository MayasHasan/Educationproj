import React from 'react';
import './Header.css';

const Header = (props) => {
    return (
        <div className="header"> 

        <h2 className="title">{props.title}</h2>
        </div>
    );
}

export default Header;
