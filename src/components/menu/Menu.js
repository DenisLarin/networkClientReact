import React from 'react';
import classes from './menu.module.scss'
import NavLinkItem from "./navLinkItem/NavLinkItem";

function Menu(props) {
    return (
        <ul className={classes.menu}>
            <NavLinkItem link='/userpage' exact>Моя страница</NavLinkItem>
            <NavLinkItem link='/friends' exact>Друзья</NavLinkItem>
            <NavLinkItem link='/search' exact>Поиск друзей</NavLinkItem>
            <NavLinkItem link='/settings' exact>Настройки</NavLinkItem>
        </ul>
    );
}

export default Menu;