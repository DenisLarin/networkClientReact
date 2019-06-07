import React from 'react';
import './optionButton.scss';

function OptionButton(props) {
    let menuBTNclasses = ['menu-btn'];
    let menuClasses = ['menu'];
    let menuWrapperClasses = ['menu-block'];
    if (props.active) {
        menuBTNclasses = ['menu-btn', 'menu-btn_active'];
        menuClasses = ['menu','menu_active']
    }
    if (props.middle){
        menuBTNclasses = ['menu-btn','menu-btn-smaller'];
        menuClasses = ['menu','menu-smaller'];
        menuWrapperClasses = ['menu-block','menu-block-smaller'];
    }
    if (props.active) {
        menuBTNclasses = ['menu-btn', 'menu-btn_active'];
        menuClasses = ['menu','menu_active'];
        if (props.middle){
            menuBTNclasses = ['menu-btn','menu-btn-smaller','menu-btn_active'];
            menuClasses = ['menu','menu-smaller','menu_active','menu-btn_active_down'];
        }
    }
    const menu = props.menus.map(menu=>{
        return  <a key={menu.logo} type={menu.type} onClick={props.onMenuItemClick}><img src={menu.logo}/></a>
    });
    return (
        <div className={menuWrapperClasses.join(' ')}>
            <a onClick={props.onMenuClickHandler} href="#" className={menuBTNclasses.join(' ')}>
                <span></span>
            </a>

            <nav className={menuClasses.join(' ')}>
                {menu}
            </nav>

        </div>
    );
}

export default OptionButton;