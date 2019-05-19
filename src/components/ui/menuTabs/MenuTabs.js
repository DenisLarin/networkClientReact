import React from 'react';
import * as classes from './menuTabs.module.scss'
import MenuTab from "./menuTab/MenuTab";

function MenuTabs(props) {
    const tabs = props.tabsMenu;
    let tabsMenus = [];
    for (let key in tabs.items) {
        tabsMenus.push({
            id: key,
            name: tabs.items[key].name,
            isActive: tabs.items[key].isActive
        });
    };
    let isActiveBackground = props.isActiveBackground ? true : false;
    let menus = tabsMenus.map(menuItem => {
        return <MenuTab key={menuItem.id} tabMenuClickHandler={(event)=>props.tabMenuClickHandler(event,menuItem.id,props.tabsMenu.type)} isActive={menuItem.isActive} isActiveBackground={isActiveBackground}>{menuItem.name}</MenuTab>
    });
    return (
        <div className={classes.menuTabs}>
            {menus}
        </div>
    );
}

export default MenuTabs;