import React from "react";
import {NavLink} from "react-router-dom";

interface INavMenuLinksProps {
    handleLogout: (e: any) => void;
}

const NavMenuLinks: React.FC<INavMenuLinksProps> = ({handleLogout}) => {
    return (
        <>
            <NavLink to='/'
                     exact
                     className='header-container__list-item'
                     activeClassName='header-container__list-item-active'>
                Account
            </NavLink>
            <NavLink to='/payment-gates'
                     exact
                     className='header-container__list-item'
                     activeClassName='header-container__list-item-active'>
                Payment Gates
            </NavLink>
            <NavLink to='/transactions'
                     exact
                     className='header-container__list-item'
                     activeClassName='header-container__list-item-active'>
                Transactions
            </NavLink>
            <a onClick={handleLogout} className='header-container__list-item header-container__list-item-btn'>Logout</a>
        </>
    )
}

export default NavMenuLinks;
