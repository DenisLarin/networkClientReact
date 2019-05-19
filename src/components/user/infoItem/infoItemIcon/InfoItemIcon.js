import React from 'react';
import classes from './infoitemIcon.module.scss'
function InfoItemIcon(props) {
    return (
        <img className={classes.infoItemIcon} src={props.url} alt=""/>
    );
}

export default InfoItemIcon;