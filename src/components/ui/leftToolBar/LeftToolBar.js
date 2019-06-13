import React from 'react';
import classes from './leftToolBar.module.scss'
import Logo from "../../menu/logo/Logo";
import Menu from "../../menu/Menu";

function LeftToolBar(props) {
    return (
        <div className={classes.leftToolBar}>
            <Logo userID={props.userID}/>
            <Menu userID={props.userID}/>
        </div>
    );
}

export default LeftToolBar;