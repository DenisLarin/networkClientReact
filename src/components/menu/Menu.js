import React from 'react';
import classes from './menu.module.scss'
import NavLinkItem from "./navLinkItem/NavLinkItem";

function Menu(props) {
    return (
        <ul className={classes.menu}>
            <NavLinkItem link='/userpage' exact>Моя страница</NavLinkItem>
        </ul>
    );
}

export default Menu;