import React from 'react';
import classes from './controlItem.module.scss'

function ControlItem(props) {
    return (
        <div className={classes.controlItem}>
            <img src={props.icon} alt=""/>
            <span>{props.counter}</span>
        </div>
    );
}

export default ControlItem;