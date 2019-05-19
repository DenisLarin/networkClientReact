import React from 'react';
import classes from './sendIcon.module.scss'

function SendIcon(props) {
    return (
        <div className={classes.sendIcon}><img src={props.img} alt="" onClick={props.onClick}/></div>
    );
}

export default SendIcon;