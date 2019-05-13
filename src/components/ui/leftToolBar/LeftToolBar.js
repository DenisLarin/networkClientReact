import React from 'react';
import classes from './leftToolBar.module.scss'
import Logo from "../../logo/Logo";
import Menu from "../../menu/Menu";

function LeftToolBar(props) {
    return (
        <div className={classes.leftToolBar}>
            <Logo/>
            <Menu/>
        </div>
    );
}

export default LeftToolBar;