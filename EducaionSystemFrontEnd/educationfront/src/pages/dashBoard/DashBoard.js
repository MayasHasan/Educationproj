import React from 'react';
import './DashBoard.css';
import SideBar from '../../components/sideBar/SideBar';
import { Outlet } from 'react-router-dom';
const DashBoard = () => {
    return (
        <div className='dashBoard'> 
        <SideBar/>
        <Outlet/>
        </div>
    );
}

export default DashBoard;
