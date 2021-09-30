import React, {useContext, useState} from "react";
import {AuthContext} from "../../AppContext";
import {Slant as Hamburger} from 'hamburger-react'

import NavMenuLinks from "./NavMenuLinks/NavMenuLinks";

import Ethereum from '../../assets/img/ethereum-brands.svg'
import './Header.scss';

const Header = () => {

    const {actions: {handleLogout}} = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(prevIsOpen => !prevIsOpen)

    return (
        <header className='header'>
            <div className='header-container'>
                <div className='header-container__logo'>
                    <img className='header-container__logo-img' src={Ethereum} alt='ethereum logo'/>
                    send-ether-admin
                </div>
                <ul className='header-container__list'>
                    <NavMenuLinks handleLogout={handleLogout}/>
                </ul>
                <div className='header-container__burger'>
                    <Hamburger onToggle={toggle} hideOutline={true}/>
                </div>
            </div>
            <ul className='burger-list' style={{display: isOpen ? 'flex' : 'none'}}>
                <NavMenuLinks handleLogout={handleLogout}/>
            </ul>
        </header>
    )
}

export default Header;
