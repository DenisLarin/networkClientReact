import React from 'react';
import classes from './infoItemContent.module.scss'

function InfoItemContent(props) {
    return (
        <div className={classes.infoItemContent}>
            <span>{props.itemName}</span>
            <span>{props.value}</span>
        </div>
    );
}

export default InfoItemContent;
