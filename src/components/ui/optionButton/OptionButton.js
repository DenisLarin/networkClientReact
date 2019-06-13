import React from 'react';
import './optionButton.scss';
import {Link} from "react-router-dom";

function OptionButton(props) {
    let menuBTNclasses = ['menu-btn'];
    let menuClasses = ['menu'];
    let menuWrapperClasses = ['menu-block'];
    if (props.active) {
        menuBTNclasses = ['menu-btn', 'menu-btn_active'];
        menuClasses = ['menu', 'menu_active']
    }
    if (props.middle) {
        menuBTNclasses = ['menu-btn', 'menu-btn-smaller'];
        menuClasses = ['menu', 'menu-smaller'];
        menuWrapperClasses = ['menu-block', 'menu-block-smaller'];
    }
    if (props.active) {
        menuBTNclasses = ['menu-btn', 'menu-btn_active'];
        menuClasses = ['menu', 'menu_active'];
        if (props.middle) {
            menuBTNclasses = ['menu-btn', 'menu-btn-smaller', 'menu-btn_active'];
            menuClasses = ['menu', 'menu-smaller', 'menu_active', 'menu-btn_active_down'];
        }
    }
    const menu = props.menus.map(menu => {
        let item = <span key={menu.logo} onClick={(event, type) => props.onMenuItemClick(event, menu.type)}><img
            src={menu.logo}/></span>;
        if (menu.url) {
           item =  <span key={menu.logo} onClick={(event, type) => props.onMenuItemClick(event, menu.type)}><img
                src={menu.logo}/><Link to={menu.url}/></span>;
        }
        return item;
    });
    return (
        <div className={menuWrapperClasses.join(' ')}>
            <span onClick={props.onMenuClickHandler} href="#" className={menuBTNclasses.join(' ')}>
                <span></span>
            </span>

            <nav className={menuClasses.join(' ')}>
                {menu}
            </nav>

        </div>
    );
}

export default OptionButton;