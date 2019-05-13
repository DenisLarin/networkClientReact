import React from 'react';
import classes from './navLinkItem.module.scss'
import {NavLink} from "react-router-dom";

function NavLinkItem(props) {
    return (
        <li className={classes.navlinkItem}>
            <NavLink activeClassName={classes.active} exact={props.exact} to={props.link}>
                {props.children}
            </NavLink>
        </li>
    );
}

export default NavLinkItem;