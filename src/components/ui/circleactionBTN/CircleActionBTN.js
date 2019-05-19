import React from 'react';
import * as classes from  './circleActionBTN.module.scss'

function CircleActionBTN(props) {
    return (
        <button className={classes.circleActionBTN}>
            <img src={props.buttonIMG} alt=""/>
        </button>
    );
}

export default CircleActionBTN;