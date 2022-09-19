import React from "react";
import {NavLink, useLocation} from "react-router-dom";

function NavItem({render, ...props}){
    const location = useLocation();
    if(!render){return false;}
    return(
        <li className="nav-item">
            <NavLink className={props.className? props.className : "nav-link"} onClick={props.onClick} to={props.href}> {props.label}</NavLink>
            {props.children}
        </li>
    )
}

export default NavItem;