import React from 'react';
import classes from './menuTab.module.scss'

function MenuTab(props) {
    let styleClass = [classes.menuTab];
    if (props.isActiveBackground) {
        styleClass = [classes.menuTab, classes.menuTab_backgrounded];
        if (props.isActive) {
            styleClass = [classes.menuTab, classes.menuTab_backgrounded, classes.active, classes.active_background];
        }
    } else {
        styleClass = [classes.menuTab];
        if (props.isActive) {
            styleClass = [classes.menuTab, classes.active, classes.active_line]
        }
    }
    return (
        <div className={styleClass.join(' ')} onClick={props.tabMenuClickHandler}>{props.children}</div>
    );
}

export default MenuTab;