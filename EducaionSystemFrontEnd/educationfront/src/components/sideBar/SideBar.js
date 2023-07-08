import React from "react";
import "./SideBar.css";
import { FaBeer } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  const navLinkStyle = ({ isActive }) => {
    return {
      fontWeight: isActive ? "900" : "normal",
      color: "inherit",
      textDecoration: "none",
      fontSize: " 17px",
    };
  };
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle"> Dashboard </h3>
          <ul className="sidebarList">
            <NavLink to="/courses" style={navLinkStyle}>
              <li className="sidebarListItem" style={{ navLinkStyle }}>
                <FaBeer className="sidebarIcon" />
                Courses
              </li>
            </NavLink>
            <h3 className="sidebarTitle"> Teachers </h3>
            <NavLink to="/teachers" style={navLinkStyle}>
              <li className="sidebarListItem">
                <FaBeer className="sidebarIcon" />
                Teachers
              </li>
            </NavLink>
            <NavLink to="/addteacher" style={navLinkStyle}>
              <li className="sidebarListItem">
                <FaBeer className="sidebarIcon" />
                Add teacher
              </li>
            </NavLink>
            <h3 className="sidebarTitle"> Sessions </h3>
            <NavLink to="/sessions" style={navLinkStyle}>
              <li className="sidebarListItem">
                <FaBeer className="sidebarIcon" />
                Sessions
              </li>
            </NavLink>
            <h3 className="sidebarTitle"> Students </h3>
            <NavLink to="/students" style={navLinkStyle}>
              <li className="sidebarListItem">
                <FaBeer className="sidebarIcon" />
                Students
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
