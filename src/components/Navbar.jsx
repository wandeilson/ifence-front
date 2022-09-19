import React, { useEffect, useState } from "react";
import {NavDropdown} from "react-bootstrap";
import {Link, useHistory, withRouter} from 'react-router-dom';
import NavItem from "./NavItem";
import "./css/Navbar.css";
import {AuthConsumer} from "../main/SessionProvider"
import { AuthenticationService } from "services";


function Navbar(props) {
    const history = useHistory();
    const isAuthenticated = props.isAuthenticated;

    return (
        <>
            <nav className="navbar navbar-expand-xs navbar-expand-sm navbar-dark bg-primary">
                <div className="container container-fluid">
                    <Link className="navbar-brand" to="/">
                        ChilDFence
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarColor01"
                        aria-controls="navbarColor01"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav">
                        <NavItem render={true} href="/" label="Home" />
                        {isAuthenticated &&
                        <>
                            <NavDropdown title="Pulseiras" id="bracelet-dropdown" >
                                <NavItem render={true} className="dropdown-item" href="/bracelets/create" label="Cadastrar Pulseira"/>
                                <NavItem render={true} className="dropdown-item" href="/bracelets" label="Listar Pulseiras"/>
                            </NavDropdown>
                            <NavDropdown title="Cercas" id="fence-dropdown" >
                                <NavItem render={true} className="dropdown-item" href="/fences/create" label="Cadastrar Cerca"/>
                                <NavItem render={true} className="dropdown-item" href="/fences" label="Listar Cercas"/>
                            </NavDropdown>
                            <NavItem render={isAuthenticated} href="/profile" label="Perfil" />
                        </>
                        }

                        <NavDropdown title="Opções" id="options-dropdown">
                            <NavItem render={isAuthenticated} className="dropdown-item" href="/profile" label="Perfil"/>
                            {isAuthenticated && <NavDropdown.Divider />}

                            <NavItem render={isAuthenticated} 
                            id="logout" 
                            href="/login" 
                            label="Logout" 
                            className="dropdown-item" 
                            onClick={props.end}/>

                            <NavItem 
                                render={!isAuthenticated} 
                                className="dropdown-item" 
                                href="/users/create" 
                                label="Cadastrar Usuário"/>
                            <NavItem 
                                render={!isAuthenticated} 
                                className="dropdown-item" 
                                href="/login" 
                                label="Login"/>
                        </NavDropdown>
                    </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;