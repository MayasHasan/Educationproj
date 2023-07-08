import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { persistor } from "../../api/store"; 
import './Navbar.css'
const Navbar = () => {
const navigate = useNavigate()
  const purge = () => {
    persistor.purge()
    navigate("/")
}
  return (
    <div className="Navbar">

       <h1 className="logo">Learning Schooling</h1>
   
        <button type="button"  onClick={purge}> SignOut</button>
    </div>
  );
};

export default Navbar;
