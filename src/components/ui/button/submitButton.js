import React from 'react';
import classes from './submitButton.module.scss'

function SubmitButton(props) {
    return (
        <button className={classes.submitButton} onClick={props.onBTNclick?props.onBTNclick: null} disabled={props.disable}>{props.children}</button>
    );
}

export default SubmitButton;