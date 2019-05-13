import React from 'react';
import classes from './submitButton.module.scss'

function SubmitButton(props) {
    return (
        <button className={classes.submitButton} disabled={props.disable}>{props.children}</button>
    );
}

export default SubmitButton;